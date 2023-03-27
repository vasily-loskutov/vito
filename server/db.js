const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("vitoDatabase", "postgres", "Wasa2083", {
  host: "localhost",
  dialect: "postgres",
});
module.exports = sequelize;
