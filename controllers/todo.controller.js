// Models
var Item = require("../models/item.js");
var List = require("../models/list.js");
var Category = require("../models/category");
var db = require("../models/db");

//
module.exports.getHomeInfo = async (req, res, next) => {
  const token = req.session.token;
  // console.log(token);

  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    let items = await Item.findAll({
      where: {
        id_user: req.session.userID,
      },
      include: "List",
    });
    let lists = await List.findAll({
      where: {
        id_user: req.session.userID,
      },
      include: "Category",
      order: [["id_category", "ASC"]],
    });

    let categories = await Category.findAll();

    const objDate = new Date();
    const date = `${objDate.getFullYear()}-${objDate.getMonth()}-${objDate.getDate()}`;

    res.render("todos.pug", {
      TASKS: items,
      LISTS: lists,
      CATEGORIES: categories,
      selected: null,
      userName: req.session.userName,
      date: date,
      admin: req.session.admin,
    });
  } catch (error) {
    console.error("Unable to connect to the database to get items:", error);
  }
};

module.exports.setOrder = async (req, res, next) => {
  // console.log(Object.keys(req.params));

  let options = [];
  let selected = {};

  Object.keys(req.params).map((k) => {
    if (k !== "direc" && req.params[k] !== undefined) {
      options.push([`${req.params[k]}`, `${req.params.direc}`]);
      selected[req.params[k]] = true;
    }
  });

  selected[req.params.direc] = true;

  // console.table(selected)

  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    let items;

    items = await Item.findAll({
      where: {
        id_user: req.session.userID,
      },
      include: "List",
      order: [...options],
    });
    let lists = await List.findAll({
      where: {
        id_user: req.session.userID,
      },
      include: "Category",
      order: [["id_category", "ASC"]],
    });

    let categories = await Category.findAll();

    // console.log(lists);

    const objDate = new Date();
    const date = `${objDate.getFullYear()}-${objDate.getMonth()}-${objDate.getDate()}`;

    console.log("----------> SORTED");

    res.render("todos.pug", {
      TASKS: items,
      LISTS: lists,
      CATEGORIES: categories,
      selected: selected,
      date: date,
      admin: req.session.admin,
    });
  } catch (error) {
    console.error("Unable to connect to the database to get items:", error);
  }

  // res.redirect("/todo");
};
