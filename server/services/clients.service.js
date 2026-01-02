const { models } = require("../models/index.model");
const cloudinary = require("../config/cloudinary");

class ClientsSrvc {
  async create(clientName, imageBuffer, bgcolor) {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "zakobs_portfolio",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(imageBuffer);
      });

      const url = await cloudinary.url(result.public_id, {
        transformation: [
          { quality: "auto", fetch_format: "auto" },
          { width: 500, height: 500, crop: "fill" },
        ],
      });

      const client = await models.Clients.create({
        image: url,
        clientName,
        public_id: result.public_id,
        bgcolor,
      });

      return client;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const allClients = await models.Clients.findAll();

      return allClients;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      const client = await models.Clients.findByPk(id);
      const deleted = await client.destroy();
      return deleted;
    } catch (error) {
      throw error;
    }
  }
  async update(id, buffer, clientName, bgcolor) {
    try {
      const client = await models.Clients.findByPk(id);

      let image = client.image;
      let public_id = client.public_id;

      if (buffer) {
        if (public_id) {
          await cloudinary.uploader.destroy(public_id);
        }

        const upload = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "zakobs_portfolio" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });

        image = cloudinary.url(upload.public_id, {
          transformation: [
            { quality: "auto", fetch_format: "auto" },
            { width: 500, height: 500, crop: "fill" },
          ],
        });

        public_id = upload.public_id;
      }

      await client.update({
        clientName: clientName ?? client.clientName,
        image,
        public_id,
        bgcolor,
      });

      return client;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ClientsSrvc();
