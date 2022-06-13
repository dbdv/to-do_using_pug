var { Model, DataTypes } = require("sequelize");
var db = require("./db");
const Category = require("./category");

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
    id_user: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    id_category: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  },
  { sequelize: db, modelName: "List" }
);

Category.hasMany(List, { as: "Lists", foreignKey: "id_category" });
List.belongsTo(Category, {
  as: "Category",
  foreignKey: "id_category",
});
module.exports = List;
