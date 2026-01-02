const contactService = require("../services/contact.service");

class ContactCtrl {
  async create(req, res) {
    try {
      const { instagram, dribble, linkedin, email } = req.body;
      console.log("✅✅✅✅✅✅✅✅✅✅", req.body);
      if (
        !instagram?.trim() ||
        !dribble?.trim() ||
        !linkedin?.trim() ||
        !email?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      const contact = await contactService.create({
        instagram,
        dribble,
        linkedin,
        email,
      });

      return res.status(201).json({
        success: true,
        message: "Social links added successfully",
        data: contact,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          message: error.errors[0].message,
        });
      }
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      const socials = await contactService.getAll();
      return res.status(200).json({ success: true, data: socials });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { instagram, dribble, linkedin, email } = req.body.data;
      if (
        !instagram?.trim() &&
        !dribble?.trim() &&
        !linkedin?.trim() &&
        !email?.trim()
      ) {
        return res.status(400).json({
          message: "At least one field must be provided for update",
        });
      }

      const updated = await contactService.update({
        id,
        instagram,
        dribble,
        linkedin,
        email,
      });

      return res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ContactCtrl();
