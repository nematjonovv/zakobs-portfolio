const servicesService = require("../services/services.service");

class ServicesCtrl {
  async create(req, res) {
    try {
      const { title, description, icon } = req.body;

      if (!title?.trim() || !description?.trim() || !icon?.trim()) {
        return res.status(400).json({
          success: false,
          message: "All fields must be filled",
        });
      }

      if (title.length > 20) {
        return res
          .status(400)
          .json({ success: false, message: "Max 20 characters" });
      }

      if (description.length > 245) {
        return res
          .status(400)
          .json({ success: false, message: "Max 245 characters" });
      }

      const service = await servicesService.create({
        title,
        description,
        icon,
      });

      res.status(201).json({
        success: true,
        data: service,
        message: "Serivce created successfully",
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((e) => e.message);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors,
        });
      }

      console.error("Create service error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
  async getAll(req, res) {
    try {
      const services = await servicesService.getAll();

      res.status(200).json({
        success: true,
        message: "All services",
        data: services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id)
        return res
          .status(400)
          .json({ success: false, message: "ID is required" });

      const deleted = await servicesService.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Service deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, icon } = req.body;

      if (!title && !description && !icon)
        return res.status(404).json({
          success: false,
          message:
            "At least one field (title, description, icon) is required to update ",
        });
      if (title.length > 20) {
        return res
          .status(400)
          .json({ success: false, message: "Title must be at most 20 characters" });
      }

      if (description.length > 245) {
        return res
          .status(400)
          .json({ success: false, message: "Description must be at most 245 characters" });
      }

      
      const updated = await servicesService.update({
        id,
        title,
        description,
        icon,
      });

      if (updated === null) {
        return res
          .status(404)
          .json({ success: false, message: `Service not found` });
      }

      res.status(200).json({
        success: true,
        message: "Service updated succesfully",
        data: updated,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ServicesCtrl();
