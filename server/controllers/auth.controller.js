const authService = require("../services/auth.service");
class authController {
  async register(req, res) {
    try {
      const { username, password, role } = req.body;
      const newUser = await authService.register({ username, password, role });

      res.status(201).json(newUser);
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const token = await authService.login({ username, password });

      if (!token) throw new Error("Invalid token");

      res
        .status(201)
        .json({ token, message: "Token muvaffaqiyatli yaratildi!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async me(req, res) {
    try {
      const decoded = req.user;
      const admin = await authService.meService({ decoded });
      if (!admin) return res.status(401).json({ message: "Admin not found!" });

      res.json({ admin, success: true, message: "Successfully logged in" });
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
  }
}

module.exports = new authController();
