const { models } = require("../models/index.model");

class ContactSrvc {
  async create({ instagram, dribble, linkedin, email }) {
    try {
      return await models.Contact.create({
        instagram,
        dribble,
        linkedin,
        email,
      });
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await models.Contact.findAll();
    } catch (error) {
      throw error;
    }
  }
  async update({ id, instagram, dribble, linkedin, email }) {
    try {
      const contact = await models.Contact.findByPk(id);

      return await contact.update({
        instagram,
        dribble,
        linkedin,
        email,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ContactSrvc();
