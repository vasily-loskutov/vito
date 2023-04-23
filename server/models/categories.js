const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Categories extends Model { }
Categories.init(
    {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        tag: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        subcategories: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
            unique: true
        },

    },
    {
        sequelize,
        modelName: "Categories",
    }
);

module.exports = Categories;
