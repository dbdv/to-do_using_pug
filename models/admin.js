var { Model, DataTypes } = require("sequelize");
var db = require("./db");
var user = require("./user");

class Admin extends Model {}
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { sequelize: db, modelName: "Admin" }
);

module.exports = Admin;
