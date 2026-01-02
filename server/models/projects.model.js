const sequelize = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Projects extends Model {}

Projects.init(
  {
    image: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: { notEmpty: { msg: "Image upload required" } },
    },
    public_id: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "projects",
    tableName: "projects",
    timestamps: true,
  }
);

module.exports = Projects;
