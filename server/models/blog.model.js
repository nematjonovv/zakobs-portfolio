const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Blog extends Model {}

Blog.init(
  {
    coverImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Blog cover image is required.",
        },
      },
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Blog title cannot be empty.",
        },
      },
    },

    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Blog subtitle is required.",
        },
      },
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Blog content cannot be empty.",
        },
      },
    },

    publishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    public_id: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "blog",
    tableName: "blog",
    timestamps: true,
  }
);

module.exports = Blog;
