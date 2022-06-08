var { Model, DataTypes } = require("sequelize");
var db = require("./db");
var Item = require("./item");
const List = require("./list");

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
  { sequelize: db, modelName: "User" }
);

User.hasMany(List, {
  as: "Lists",
  foreignKey: "id_user",
});

User.hasMany(Item, {
  as: "Items",
  foreignKey: "id_user",
});

module.exports = User;
