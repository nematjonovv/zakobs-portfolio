const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Contact extends Model {}

Contact.init(
  {
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: {
          msg: "Please enter a valid URL",
        },
      },
    },

    dribble: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: {
          msg: "Please enter a valid URL",
        },
      },
    },

    linkedin: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: {
          msg: "Please enter a valid URL",
        },
      },
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please enter a valid email address",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "contact",
    tableName: "contacts",
    timestamps: true,
  }
);

module.exports = Contact;
