const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Testimonials extends Model {}

Testimonials.init(
  {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Oops! Please provide the testimonial image.",
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Who shared this awesome feedback? Author name is missing!",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please tell us the author’s role or position.",
        },
      },
    },
    opinion: {
      type: DataTypes.STRING(265),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Don't leave this blank! Share what the client thinks.",
        },
        len: {
          args: [1, 265],
          msg: "Opinion must be less than 265 characters",
        },
      },
    },
    public_id: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "testimonials",
    tableName: "testimonials",
  }
);

module.exports = Testimonials;
