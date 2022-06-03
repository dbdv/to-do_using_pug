const Admin = require("./admin");
const Category = require("./category");
const InList = require("./in_list");
const Item = require("./item");
const List = require("./list");
const Priority = require("./priority");
const User = require("./user");

//Relacion lista-categoria

Category.hasMany(List);

List.belongsTo(Category, {
  foreignKey: "id_user",
});

//Relacion usuario-lista

User.hasMany(List);

List.belongsTo(User, {
  foreignKey: "id_user",
});

//Relacion usuario-item

User.hasMany(Item);

Item.belongsTo(User, {
  foreignKey: "id_user",
});

//Relacion admin-usuario

Admin.belongsTo(User, {
  foreignKey: "id_user",
});

//Relaciones item-lista

Item.belongsToMany(List, {
  through: InList,
  foreignKey: "id_item",
});

List.belongsToMany(Item, {
  through: InList,
  foreignKey: "id_list",
});

List.hasMany(InList);
InList.belongsTo(User);

Item.hasMany(InList);
InList.belongsToMany(Item);

//Relacion prioridad-item

Priority.hasMany(Item);

Item.belongsToMany(Priority);
