var { Sequelize } = require("sequelize");

const db = new Sequelize(`${process.env.DB}`, "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
