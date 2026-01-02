const blogService = require("../services/blog.service");

class BlogCtrl {
  async create(req, res) {
    try {
      const { title, subtitle, content } = req.body;
      const file = req.file;
      if (!title?.trim() || !subtitle?.trim() || !content?.trim()) {
        return res.status(400).json({
          success: false,
          message: "All fields must be filled",
        });
      }

      const post = await blogService.create(
        title,
        file.buffer,
        subtitle,
        content
      );

      return res
        .status(201)
        .json({ success: true, message: "Created successfully", data: post });
    } catch (error) {
      return res.status(500).json({ success: true, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const posts = await blogService.getAll();
      return res.status(200).json({ success: true, data: posts });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID parametr is required" });
      }

      const post = await blogService.getOne(id);

      if (post === null) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }

      return res.status(200).json({ success: true, data: post });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID parametr is required" });
      }
      const deleted = await blogService.delete(id);

      if (!deleted) {
        return res.status(404).json({
          succes: false,
          message: "No post exists with the given ID.",
        });
      }

      return res
        .status(200)
        .json({ succes: true, message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, subtitle, content } = req.body;
      const file = req.file;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID parametr is required" });
      }

      if (!title?.trim() || !subtitle?.trim() || !content?.trim()) {
        return res.status(400).json({
          success: false,
          message: "All fields must be filled",
        });
      }

      const updated = await blogService.update(
        id,
        title,
        file.buffer,
        subtitle,
        content
      );

      return res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({ succes: false, message: error.message });
    }
  }
}

module.exports = new BlogCtrl();
