var { Model, DataTypes } = require("sequelize");
var db = require("./db");

class Priority extends Model {}
Priority.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descrip: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "Priority" }
);

module.exports = Priority;
