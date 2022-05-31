var { DataTypes } = require("sequelize");
var db = require("./db");
var Item = require("./item");
var List = require("./list");

const InList = db.define("InLists", {
  id_list: {
    type: DataTypes.INTEGER,
    references: {
      model: List,
      key: "id",
    },
  },
  id_item: {
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: "id",
    },
  },
});

// Item.hasMany()

Item.belongsToMany(List, {
  through: InList,
  foreignKey: "id_item"
});

List.belongsToMany(Item, {
  through: InList,
  foreignKey: "id_list"
});

module.exports = InList;
