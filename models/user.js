var { Model, DataTypes } = require("sequelize");
var db = require("./db");
var item = require("./item");
var list = require("./list");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    pass: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "Priority" }
);

module.exports = User;
