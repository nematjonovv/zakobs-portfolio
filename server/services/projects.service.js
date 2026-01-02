const { models } = require("../models/index.model");
const cloudinary = require("../config/cloudinary");
class ProjectsSrvc {
  async create(buffer) {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "zakobs_portfolio",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      const url = cloudinary.url(result.public_id, {
        transformation: [
          { quality: "auto", fetch_format: "auto" },
          { width: 800, crop: "fill" },
        ],
      });

      const project = await models.Projects.create({
        image: url,
        public_id: result.public_id,
      });

      return project;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const projects = await models.Projects.findAll();
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      const project = models.Projects.findByPk(id);
      return project;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const project = await models.Projects.findByPk(id);
      const deleted = await project.destroy();
      if (project.public_id) {
        await cloudinary.uploader.destroy(project.public_id);
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProjectsSrvc();
