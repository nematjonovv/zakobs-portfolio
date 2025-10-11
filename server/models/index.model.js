const sequelize = require("../config/db");
const Services = require("../models/services.model");
const models = {
  Services,
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

module.exports = { models };
