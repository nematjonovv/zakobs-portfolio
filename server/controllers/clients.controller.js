const clientsService = require("../services/clients.service");

class ClientCtrl {
  async create(req, res) {
    try {
      const { clientName, bgcolor } = req.body;
      const imageBuffer = req.file.buffer;
      if (!clientName) {
        return res.status(400).json({
          success: false,
          message: "Client name is required",
        }); 
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image file is required",
        });
      }

      const client = await clientsService.create(
        clientName,
        imageBuffer,
        bgcolor
      );
      if (!client) {
        return res.status(500).json({
          success: false,
          message: "Failed to create client",
        });
      }

      return res
        .status(201)
        .json({ succes: true, message: "Client created", data: client });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const allClients = await clientsService.getAll();
      return res.status(200).json({ succes: true, data: allClients });
    } catch (error) {
      return res.status(500).json({ succes: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({
          succes: false,
          message: "The ID parameter is missing or invalid.",
        });
      const deleted = await clientsService.delete(id);

      if (!deleted)
        return res.status(404).json({
          succes: false,
          message: "No client exists with the given ID.",
        });

      return res
        .status(200)
        .json({ succes: true, message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).json({ succes: false, message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { clientName, bgcolor } = req.body;
      const buffer = req.file.buffer;

      if (!id) {
        return res.status(400).json({
          succes: false,
          message: "The ID parameter is missing or invalid.",
        });
      }
      if (!clientName && !buffer) {
        return res.status(400).json({
          success: false,
          message: "Nothing to update",
        });
      }

      const updated = await clientsService.update(
        id,
        buffer,
        clientName,
        bgcolor
      );
      if (!updated) {
        return res
          .status(404)
          .json({ succes: false, message: "Client not found" });
      }

      return res
        .status(200)
        .json({ succes: true, message: "Updated successfully" });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ClientCtrl();
