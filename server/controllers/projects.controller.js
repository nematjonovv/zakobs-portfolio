const { models } = require("../models/index.model");
const projectsService = require("../services/projects.service");

class ProjectsCtrl {
  async create(req, res) {
    try {
      const result = await projectsService.create(req.file.buffer);
      return res
        .status(201)
        .json({ success: true, message: "Uploaded", data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const projects = await projectsService.getAll();
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;

      if (!id)
        return res
          .status(400)
          .json({ success: false, message: "ID parametr is required" });

      const project = await projectsService.getOne(id);

      if (!project)
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });

      return res.status(200).json({ success: true, data: project });
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
      const deleted = await projectsService.delete(id);
      if (!deleted)
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
        data: deleted,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ProjectsCtrl();
