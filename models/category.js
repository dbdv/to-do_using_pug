var { Model, DataTypes } = require("sequelize");
var db = require("./db");
const List = require("./list");

class Category extends Model {}
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cat: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "Category" }
);

module.exports = Category;
