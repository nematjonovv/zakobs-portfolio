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

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .json({ success: false, message: "ID parametr is required" });
      const deleted = await userServices.delete(id);
      if (!deleted)
        return res
          .status(404)
          .json({ success: false, message: "Account not found" });

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
        data: deleted,
      });
    } catch (error) {}
  }
}

module.exports = new UserController();
