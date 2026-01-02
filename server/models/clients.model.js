const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Clients extends Model {}

Clients.init(
  {
    image: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: { notEmpty: { msg: "Image upload required" } },
    },
    clientName: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: { notEmpty: { msg: "Client name required" } },
    },
    bgcolor: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    public_id: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clients",
    modelName: "clients",
    timestamps: true,
  }
);

module.exports = Clients;
