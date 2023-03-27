const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class PurchasedGood extends Model {}

PurchasedGood.init(
  {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    name: {
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

    linkToGoodPage: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    isFeedback: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },

  {
    sequelize,
    modelName: "PurchasedGood",
    tableName: "PurchasedGood",
  }
);

module.exports = PurchasedGood;
