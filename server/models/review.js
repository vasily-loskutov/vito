const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Review extends Model {}

Review.init(
  {
    comment: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    minus: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    plus: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    goodId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    date: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rate: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "Review",
  }
);

module.exports = Review;
