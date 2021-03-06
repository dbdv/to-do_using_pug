// Models
var Item = require("../models/item.js");
var List = require("../models/list.js");
var db = require("../models/db");

const addItem = async (req, res, next) => {
  if (!req.body.newTask) res.status(400).send();
  try {
    await db.authenticate();
    // console.table(req.body.newTask);
    // console.log(req.body);
    const inserted = await Item.create({
      ...req.body.newTask,
      id_list: req.body.id_list,
      id_user: req.session.userID,
    });
    // console.log(inserted.id, req.body.listID);
    //inserted.setLists(req.body.listsID);
    // console.log(inserted);
    if (inserted.id_list && inserted.state != "Resuelta") {
      const list = await List.findByPk(inserted.id_list);
      list.state = "Sin resolver";
      await list.save();
      console.log("----------> LISTA ACTUALIZADA");
    }
    console.log("----------> ITEM AGREGADO");
    res.status(201).redirect("/");
  } catch (error) {
    console.error("Unable to connect to the database to insert item:", error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    await db.authenticate();
    // console.log(req.params.id);
    const item = await Item.findByPk(req.params.id);
    if (item.id_list) {
      const list = await List.findByPk(item.id_list, {
        include: "Items",
      });
      const listResolved = Object.values(list.getDataValue("Items")).some(
        (k) => k.state !== "Resuelta"
      );

      if (!listResolved) {
        await list.update({
          state: "Resuelta",
        });
        console.log("-----------> LISTA ACTUALIZADA A RESUELTA");
      }
    }
    await item.destroy();
    // let items = await Item.findAll();
    // items = JSON.parse(JSON.stringify(items));
    // items = items.map(i => {
    //   {i.descrip}
    // })
    // res.render("todos.pug", { "TASKS": items });
    console.log("----------> ITEM ELIMINADO");
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
    // console.log(item);
    item.save().then(() => {
      console.log("----------> ITEM RESUELTO");
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
      console.log("----------> ITEM SIN RESOLVER");

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
      console.log("----------> ITEM RESOLVIENDOSE");

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
