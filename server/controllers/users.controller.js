const userServices = require("../services/user.services");

class UserController {
  async getAll(req, res) {
    try {
      const users = await userServices.get();

      return res.status(200).json({ success: false, data: users });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new UserController();
