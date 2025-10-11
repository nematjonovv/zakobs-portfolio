const { models } = require("../models/index.model");

class servicesService {
  async create({ title, serviceDesc, icon }) {
    try {
        return await models.Services.create({ title, serviceDesc, icon });
    } catch (error) {
        if(error) throw new Error(error)
    }
  }
}

module.exports = new servicesService();
