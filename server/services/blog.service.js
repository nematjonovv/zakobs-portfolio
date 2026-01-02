const cloudinary = require("../config/cloudinary");
const { models } = require("../models/index.model");

class BlogSrvc {
  async create(title, buffer, subtitle, content) {
    try {
      const upload = await new Promise((resovle, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "zakobs_portfolio" },
          (error, result) => {
            if (error) reject(error);
            else resovle(result);
          }
        );
        stream.end(buffer);
      });

      const cover = cloudinary.url(upload.public_id, {
        transformation: [
          { quality: "auto", fetch_format: "auto" },
          { width: 500, height: 500, crop: "fill" },
        ],
      });

      const post = await models.Blog.create({
        coverImage: cover,
        title,
        subtitle,
        content,
        public_id: upload.public_id,
      });

      return post;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const post = await models.Blog.findAll();
      return post;
    } catch (error) {
      throw error;
    }
  }
  async getOne(id) {
    const post = await models.Blog.findByPk(id);
    return post;
  }
  async delete(id) {
    try {
      const post = await models.Blog.findByPk(id);
      if (!post) {
        return null;
      }
      if (post.public_id) {
        await cloudinary.uploader.destroy(post.public_id);
      }
      await post.destroy();

      return post;
    } catch (error) {
      throw error;
    }
  }
  async update(id, title, buffer, subtitle, content) {
    try {
      const post = await models.Blog.findByPk(id);

      let image = post.image;
      let public_id = post.public_id;

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

      await post.update({
        title,
        image,
        subtitle,
        content,
        public_id,
      });

      return post;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BlogSrvc();
