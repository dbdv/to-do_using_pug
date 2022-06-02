var { Sequelize} = require("sequelize");

const db = new Sequelize("db_todo_prueba", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;