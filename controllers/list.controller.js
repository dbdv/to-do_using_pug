//Models
var Item = require("../models/item.js");
var List = require("../models/list.js");
const InList = require("../models/in_list.js");
var db = require("../models/db");

const getList = async function (req, res, next) {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    let LISTS = await List.findAll();
    let list = await List.findByPk(req.params.id);
    const itemsOfList = await list.getItems();
    // console.log(list);
    res.render("list2.pug", {
      list: list,
      LISTS: LISTS,
      ITEMS: itemsOfList,
      selected: null,
    });
  } catch (error) {
    console.error(
      "Unable to connect to the database to get list by id: " + req.params.id,
      error
    );
  }
};

const addList = async (req, res, next) => {
  console.log(req.body);
  try {
    await db.authenticate();

    const inserted = await List.create(req.body);

    res.status(201).redirect("/");
  } catch (error) {
    console.error("Unable to connect to the database to insert LIST:", error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    // console.log(req)
    const id_list = req.body.id_list;
    const id_item = req.body.id_item;

    await db.authenticate();

    const link = await InList.findOne({
      where: { id_item: id_item, id_list: id_list },
    });

    console.log(link);

    InList.destroy({
      where: {
        id_item: link.id_item,
        id_list: link.id_list,
      },
    }).then(() => {
      res.redirect(201, "/list/" + id_list);
    });
  } catch (error) {
    console.error("Unable to connect to the database to unlink item:", error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    await db.authenticate();

    const list = await List.findByPk(req.params.id);

    list.destroy().then(() => {
      res.redirect(201, "/");
    });
  } catch (error) {
    console.error("Unable to connect to the database to unlink item:", error);
  }
};

const sortList = async (req, res, next) => {
  let options = [];
  let selected = {};

  Object.keys(req.params).map((k) => {
    if (k !== "direc" && k !== "idList" && req.params[k] !== undefined) {
      options.push([Item, `${req.params[k]}`, `${req.params.direc}`]);
      selected[req.params[k]] = true;
    }
  });

  selected[req.params.direc] = true;

  console.log(options);

  try {
    await db.authenticate();
    let LISTS = await List.findAll();
    // console.log("--------------------------------------------------------");
    const ListSorted = await List.findOne({
      where: {
        id: req.params.idList,
      },
      include: [{ model: Item }],
      order: [...options],
      //  order: [...options]
    });
    // console.log(
    //   "-----------------------------------------------------------------"
    // );
    // console.log(ListSorted.getDataValue("Items"));
    // console.log(
    //   "-----------------------------------------------------------------"
    // );
    const itemsOfList = ListSorted.getDataValue("Items");
    // console.log(list);
    res.render("list2.pug", {
      list: ListSorted,
      LISTS: LISTS,
      ITEMS: itemsOfList,
      selected: selected,
    });
  } catch (error) {
    console.error("Unable to connect to the database to get items:", error);
  }
};

module.exports = {
  getList,
  addList,
  removeItem,
  deleteItem,
  sortList,
};
