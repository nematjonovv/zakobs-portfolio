const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Users extends Model {}

Users.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{notEmpty: true}
    },
    role:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{notEmpty: true}
    }
  },
  {
    sequelize,
    modelName: "users",
    tableName: "users",
    timestamps: true,
  }
);

module.exports = Users;
