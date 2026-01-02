const testimonialsService = require("../services/testimonials.service");

class TestimonialCtrl {
  async create(req, res) {
    try {
      const { author, role, opinion } = req.body;
      const buffer = req.file.buffer;

      if (!author || !role || !opinion || !buffer) {
        return res
          .status(400)
          .json({ success: false, message: "Please complete all fields" });
      }
      const testimonial = await testimonialsService.create(
        author,
        role,
        opinion,
        buffer
      );

      if (!testimonial) {
        return res.status(400).json({
          success: false,
          message:
            "Failed to create testimonial. Please check the input fields",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Created successfully",
        data: testimonial,
      });
    } catch (error) {
      if (err.name === "SequelizeValidationError") {
        const messages = err.errors.map((e) => e.message);
        return res.status(400).json({ success: false, errors: messages });
      }
      return res.status(500).json({ success: false, error });
    }
  }
  async getAll(req, res) {
    try {
      const testimonials = await testimonialsService.getAll();
      if (testimonials === null) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch testimonial,Please refresh the page",
        });
      }

      return res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({
          succes: false,
          message: "The ID parameter is missing or invalid.",
        });
      const deleted = await testimonialsService.delete(id);

      if (!deleted)
        return res.status(404).json({
          succes: false,
          message: "No testimonial exists with the given ID.",
        });

      return res
        .status(200)
        .json({ succes: true, message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).json({ succes: false, message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { author, role, opinion } = req.body;
      const file = req.file;
      if (!id) {
        return res.status(400).json({
          succes: false,
          message: "The ID parameter is missing or invalid.",
        });
      }
      if (!author && !file.buffer && !role && !opinion) {
        return res.status(400).json({
          success: false,
          message: "Nothing to update",
        });
      }
      const updated = await testimonialsService.update(
        id,
        file.buffer,
        author,
        role,
        opinion
      );

      if (!updated) {
        return res
          .status(404)
          .json({ succes: false, message: "Client not found" });
      }

      return res
        .status(200)
        .json({ succes: true, message: "Updated successfully", data: updated });
    } catch (error) {
      if (err.name === "SequelizeValidationError") {
        const messages = err.errors.map((e) => e.message);
        return res.status(400).json({ success: false, errors: messages });
      }
      return res.status(500).json({ succes: false, message: error.message });
    }
  }
}

module.exports = new TestimonialCtrl();
