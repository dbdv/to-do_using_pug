//Models
var Item = require("../models/item.js");
var List = require("../models/list.js");
var Category = require("../models/category");
var db = require("../models/db");

const getList = async function (req, res, next) {
  // console.log("session", req.session);
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    let LISTS = await List.findAll({
      where: {
        id_user: req.session.userID,
      },
      include: "Category",
      order: [["id_category", "ASC"]],
    });
    let list = await List.findOne({
      where: {
        id_user: req.session.userID,
        id: req.params.id,
      },
      include: "Items",
    });

    let categories = await Category.findAll();

    res.render("list2.pug", {
      list: list,
      LISTS: LISTS,
      CATEGORIES: categories,
      ITEMS: list.Items, //itemsOfList,
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
  //console.log(req.body);
  try {
    await db.authenticate();

    const inserted = await List.create({
      ...req.body,
      id_user: req.session.userID,
    });

    res.status(201).redirect("/");
  } catch (error) {
    console.error("Unable to connect to the database to insert LIST:", error);
  }
};

const deleteList = async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.authenticate();

    await Item.destroy({
      where: {
        id_list: id,
      },
    });
    await List.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).redirect("/");
  } catch (error) {
    console.error("Unable to connect to the database to insert LIST:", error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { id_item, id_list } = req.body;

    // await db.authenticate();

    // Item.update(
    //   { id_list: null },
    //   {
    //     where: {
    //       id_item: id_item,
    //     },
    //   }
    // ).then(() => {
    //   console.log(id_item, id_list);
    //   res.redirect(201, "/list/" + id_list);
    // });

    const item = await Item.findByPk(id_item);
    const list = await List.findByPk(item.id_list);
    item.id_list = null;
    item.save().then(async () => {
      console.log("-----------> Item unlinked");
      const listResolved = Object.values(list.getDataValue("Items")).some(
        (k) => k.state !== "Resuelta"
      );

      if (!listResolved) {
        await list.update({
          state: "Resuelta",
        });
        console.log("-----------> LISTA ACTUALIZADA A RESUELTA");
      }
      res.status(201).redirect("/list/" + id_list);
    });
  } catch (error) {
    console.error("Unable to connect to the database to unlink item:", error);
  }
};

/* const deleteItem = async (req, res, next) => {
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
 */
const sortList = async (req, res, next) => {
  let options = [];
  let selected = {};

  Object.keys(req.params).map((k) => {
    if (k !== "direc" && k !== "idList" && req.params[k] !== undefined) {
      options.push(["Items", `${req.params[k]}`, `${req.params.direc}`]);
      selected[req.params[k]] = true;
    }
  });

  selected[req.params.direc] = true;

  // console.log(options);

  try {
    await db.authenticate();
    let LISTS = List.findAll({
      where: {
        id_user: req.session.userID,
      },
      include: "Category",
      order: [["id_category", "ASC"]],
    });
    // console.log("--------------------------------------------------------");
    const ListSorted = await List.findOne({
      where: {
        id: req.params.idList,
      },
      include: [{ model: Item, as: "Items" }],
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
    // console.log(itemsOfList);
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

const resolveList = (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  Item.update(
    {
      state: "Resuelta",
    },
    {
      where: {
        id_list: id,
      },
    }
  ).then(() => {
    List.update(
      { state: "Resuelta" },
      {
        where: {
          id: id,
        },
      }
    ).then(() => {
      res.status(201).send();
    });
  });
};

module.exports = {
  getList,
  addList,
  removeItem,
  // deleteItem,
  sortList,
  resolveList,
  deleteList,
};
