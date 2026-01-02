const requestsService = require("../services/requests.service");

class RequestsCtrl {
  async create(req, res) {
    try {
      const { name, email, message } = req.body;

      const request = await requestsService.create(name, email, message);

      return res.status(201).json({
        success: true,
        message: "Created successfully",
        data: request,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          message: error.errors[0].message,
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      const requests = await requestsService.getAll();

      return res.status(200).json({ success: true, data: requests });
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
          .json({ success: false, message: "ID parametr not found" });
      const request = await requestsService.getOne(id);

      if (!request)
        return res.status(404).json({
          success: false,
          message: "request with given ID, not found",
        });
      return res.status(200).json({ success: true, data: request });
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
          .json({ success: false, message: "ID parametr not found" });
      const deleted = await requestsService.delete(id);
      if (deleted === null) {
        return res
          .status(404)
          .json({ success: false, message: "Request not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Deleted succesfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new RequestsCtrl();
