const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Services extends Model {}

Services.init(
  {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { notEmpty: true },
    },
    serviceDesc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    sequelize,
    modelName: "Services",
    tableName: "services",
    timestamps:false
  }
);

module.export = Services
