const sequelize = require("../config/db");
const Users = require('../models/users.model')
const Services = require('../models/services.model');
const Projects = require("./projects.model");
const Clients = require("./clients.model");
const Testimonials = require("./testimonials.model");
const Blog = require("./blog.model");
const Requests = require("./requests.model");
const Contact = require("./contact.model");
const models = {
  Users,
  Services,
  Projects,
  Clients,
  Testimonials,
  Blog,
  Requests,
  Contact
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

module.exports = { models };
