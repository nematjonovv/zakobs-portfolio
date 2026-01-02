  const { models } = require("../models/index.model");

  class RequestsSrvc {
    async create(name, email, message) {
      try {
        const request = await models.Requests.create({
          name,
          email,
          message,
        });

        return request;
      } catch (error) {
        throw error;
      }
    }
    async getAll() {
      try {
        return await models.Requests.findAll();
      } catch (error) {
        throw error;
      }
    }
    async getOne(id) {
      try {
        return models.Requests.findByPk(id);
      } catch (error) {
        throw error;
      }
    }
    async delete(id) {
      const request = await models.Requests.findByPk(id);
      if (!request) {
        throw new Error("Request not found");
      }
      await request.destroy();
    }
  }

  module.exports = new RequestsSrvc();
