const { models } = require("../models/index.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class authService {
  async register({ username, password, role }) {
    try {
      const existing = await models.Users.findOne({
        where: { username },
      });

      if (existing) throw new Error("Bunday foydalanuvchi mavjud!");
      if (!password) throw new Error("Password bo'lishi shart!");

      const round = parseInt(process.env.SALT_ROUND) || 10;
      const salt = await bcrypt.genSalt(round);
      const hashPass = await bcrypt.hash(password, salt);

      const newUser = await models.Users.create({
        username,
        password: hashPass,
        role,
      });

      return {
        newUser: { id: newUser.id, username: newUser.username },
        message: "Muvaffaqiyatli ro'yxatdan o'tdi!",
      };
    } catch (error) {
      if (error) {
        throw new Error(error.message);
      }
    }
  }

  async login({ username, password }) {
    const existing = await models.Users.findOne({ where: { username } });
    const isMatch = await bcrypt.compare(password, existing.password);
    if (!existing || !isMatch)
      throw new Error("username or password incorrect");

    const payload = {
      id: existing.id,
      username: existing.username,
      role: existing.role,
    };

    const jwt_secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXIN || "1m";
    const token = jwt.sign(payload, jwt_secret, { expiresIn });
    return token;
  }

  async meService({ decoded }) {
    const admin = await models.Users.findOne({ where: { id: decoded.id } });

    return admin;
  }
}

module.exports = new authService();
