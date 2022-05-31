var { Sequelize} = require("sequelize");

const db = new Sequelize("todo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;