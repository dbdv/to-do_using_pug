// Models
var Item = require("../models/item.js");
var List = require("../models/list.js");
const InList = require("../models/in_list.js");
var db = require("../models/db");

const addItem = async (req, res, next) => {
  try {
    await db.authenticate();
    // console.table(req.body.newTask);
    const inserted = await Item.create(req.body.newTask);
    // console.log(inserted.id, req.body.listID);
    await inserted.setLists(req.body.listsID);
    res.status(201).redirect("/");
  } catch (error) {
    console.error("Unable to connect to the database to insert item:", error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    await db.authenticate();

    const item = await Item.findByPk(req.params.id);
    item.setLists(null);
    await item.destroy();
    // let items = await Item.findAll();
    // items = JSON.parse(JSON.stringify(items));
    // items = items.map(i => {
    //   {i.descrip}
    // })
    // res.render("todos.pug", { "TASKS": items });
    res.status(201).redirect("/");
  } catch (error) {
    console.error("Unable to connect to the database to delete item:", error);
  }
};

const markResolve = async (req, res, next) => {
  try {
    await db.authenticate();

    const item = await Item.findByPk(req.params.id);
    item.state = "Resuelta";
    console.log(item)
    item.save().then(() => {
      res.status(201).redirect("/");
    });
    // let items = await Item.findAll();
    // items = JSON.parse(JSON.stringify(items));
    // items = items.map(i => {
    //   {i.descrip}
    // })
    // res.render("todos.pug", { "TASKS": items });
  } catch (error) {
    console.error("Unable to connect to the database to update item:", error);
  }
};

const markUnresolve = async (req, res, next) => {
  try {
    await db.authenticate();

    const item = await Item.findByPk(req.params.id);
    item.state = "Sin resolver";
    item.save().then(() => {
      res.status(201).redirect("/");
    });
  } catch (error) {
    console.error("Unable to connect to the database to update item:", error);
  }
};

const markResolving = async (req, res, next) => {
    try {
      await db.authenticate();
  
      const item = await Item.findByPk(req.params.id);
      item.state = "Resolviendo";
      item.save().then(() => {
        res.status(201).redirect("/");
      });
    } catch (error) {
      console.error("Unable to connect to the database to update item:", error);
    }
  };

module.exports = {
  addItem,
  deleteItem,
  markResolve,
  markResolving,
  markUnresolve
};
