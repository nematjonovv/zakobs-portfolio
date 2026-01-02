const { models } = require("../models/index.model");

class ServicesSrvc {
  async create({ title, description, icon }) {
    try {
      const allServices = await models.Services.findAll();
      if (allServices.length >= 6) {
        throw new Error("You can add a maximum of 6 services.");
      }

      return await models.Services.create({ title, description, icon });
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await models.Services.findAll();
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      const deleted = await models.Services.findByPk(id);
      if (!deleted) return null;
      await deleted.destroy();

      return true;
    } catch (error) {
      throw error;
    }
  }
  async update({ id, title, description, icon }) {
    try {
      const service = await models.Services.findByPk(id);
      if (!service) return null;
      const updated = await service.update({ title, description, icon });

      return updated;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ServicesSrvc();
