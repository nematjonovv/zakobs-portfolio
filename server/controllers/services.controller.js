const servicesService = require("../services/services.service");
class servicesController {
  async createService(req, res) {
    try {
      const { title, serviceDesc, icon } = req.body;

      const service = await servicesService.create({
        title,
        serviceDesc,
        icon,
      });

      res.status(201).json({ message: "Serivce created successfully", service });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
}

module.exports = new servicesController()