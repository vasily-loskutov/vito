const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Good extends Model { }

Good.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT('long'),
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    photo: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    rate: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

  },
  {
    sequelize,
    modelName: "Good",
  }
);

module.exports = Good;
