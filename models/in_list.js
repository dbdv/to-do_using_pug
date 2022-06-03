var { DataTypes } = require("sequelize");
var db = require("./db");
var Item = require("./item");
var List = require("./list");
const User = require("./user");

const InList = db.define("InLists", {
  // id_list: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: List,
  //     key: "id",
  //   },
  // },
  // id_item: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Item,
  //     key: "id",
  //   },
  // },
});

module.exports = InList;
