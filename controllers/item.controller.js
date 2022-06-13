// Models
var Item = require("../models/item.js");
var List = require("../models/list.js");
var db = require("../models/db");

const addItem = async (req, res, next) => {
  if (!req.body.newTask) res.status(400).send();
  try {
    await db.authenticate();
    // console.table(req.body.newTask);
    console.log(req.body);
    const inserted = await Item.create({
      ...req.body.newTask,
      id_list: req.body.id_list,
      id_user: req.session.userID,
    });
    // console.log(inserted.id, req.body.listID);
    //inserted.setLists(req.body.listsID);
    console.log(inserted);
    await inserted.save();
    res.status(201).redirect("/");
  } catch (error) {
    console.error("Unable to connect to the database to insert item:", error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    await db.authenticate();

    const item = await Item.findByPk(req.params.id);
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
    item.resolutionDate = new Date(Date.now());
    console.log(item);
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
  markUnresolve,
};
