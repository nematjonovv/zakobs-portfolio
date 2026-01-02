const sequelize = require('../config/db')
const {DataTypes, Model} = require('sequelize')

class Services extends Model {}

Services.init(
    {
        title:{
            type:DataTypes.STRING(20),
            allowNull:false,
            validate: {notEmpty: {msg: "This field is required"}, len: [1, 20]}
        },
        description:{
            type: DataTypes.TEXT(),
            allowNull:false,
            validate:{notEmpty: {msg: "This field is required"}, len: [1, 245]},
        },
        icon:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty: {msg: "This field is required"}}
        }
    },
    {
        sequelize,
        modelName: "services",
        tableName:"services",
        timestamps: true
    }
)


module.exports = Services