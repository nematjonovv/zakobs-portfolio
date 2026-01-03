const { models } = require("../models/index.model");

class UserSrvc {
  async get() {
    try {
      return await models.Users.findAll({
        attributes: { exclude: ["password"] },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserSrvc();
