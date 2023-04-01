const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Good extends Model { }

Good.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
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
    },
   
  },
  {
    sequelize,
    modelName: "Good",
  }
);

module.exports = Good;
