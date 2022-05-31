var { Model, DataTypes } = require("sequelize");
var db = require("./db");


class List extends Model {}
List.init(
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
    state: {
      type: DataTypes.STRING,
      // validate:{
      //   in: ["Unsolved", "Solving", "Solved"]
      // }
    },
  },
  { sequelize: db, modelName: "List" }
);

module.exports = List;
