const { models } = require("../models/index.model");
const cloudinary = require("../config/cloudinary");
class TestimonialSrvc {
  async create(author, role, opinion, buffer) {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "zakobs_portfolio",
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      const url = cloudinary.url(result.public_id, {
        transformation: [
          { quality: "auto", fetch_format: "auto" },
          { width: 100, height: 100, crop: "fill" },
        ],
      });

      const testimonial = await models.Testimonials.create({
        image: url,
        author,
        role,
        opinion,
        public_id: result.public_id,
      });
      return testimonial;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const testimonials = await models.Testimonials.findAll();
      return testimonials;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      const testimonial = await models.Testimonials.findByPk(id);

      return await testimonial.destroy();
    } catch (error) {
      throw error;
    }
  }

  async update(id, buffer, author, role, opinion) {
    try {
      const testimonial = await models.Testimonials.findByPk(id);
      let image = testimonial.image;
      let public_id = testimonial.public_id;

      if (buffer) {
        if (public_id) {
          await cloudinary.uploader.destroy(public_id);
        }

        const upload = new Promise((resolve, reject) => {
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
            { width: 100, height: 100, crop: "fill" },
          ],
        });

        public_id = upload.public_id;
      }

      await testimonial.update({
        image,
        author,
        role,
        opinion,
        public_id,
      });

      return testimonial;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TestimonialSrvc();
