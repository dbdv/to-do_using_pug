var { Model, DataTypes } = require("sequelize");
var db = require("./db");
const List = require("./list");

class Item extends Model {}

// Item.associate = () => {
//   Item.belongsTo(List, {
//     foreignKey: "id_item",
//   });
// };

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
      type: DataTypes.INTEGER,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
    },
    id_user: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    id_list: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "Item" }
);

List.hasMany(Item, { as: "Items", foreignKey: "id_list" });

module.exports = Item;
