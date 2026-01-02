const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Requests extends Model {}

Requests.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Don’t be shy — tell me your name 🙂",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "I’ll need your email to get back to you 📩",
        },
        isEmail: {
          msg: "That doesn’t look like a valid email address 🤔",
        },
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Tell me a little about your project — I’m listening 👀",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Requests",
    tableName: "Requests",
    timestamps: true,
  }
);

module.exports = Requests;
