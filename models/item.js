var { Model, DataTypes } = require("sequelize");
var db = require("./db");

class Item extends Model {}
Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resolutionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    descrip: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
      // validate:{
      //   in: ["Low", "Medium", "High"]
      // }
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      // validate:{
      //   in: ["Unsolved", "Solving", "Solved"]
      // }
    },
  },
  { sequelize: db, modelName: "Item" }
);

module.exports = Item;
