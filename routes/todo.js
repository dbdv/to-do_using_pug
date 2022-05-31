// Lib de terceros
var express = require("express");
var router = express.Router();
var pug = require("pug");

// Mis modulos
var Item = require("../models/item.js");
var List = require("../models/list.js");
const InList = require("../models/in_list.js");
var db = require("../models/db");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    let items = await Item.findAll({
      include: "Lists",
    });
    //console.log(typeof items)
    // items = JSON.parse(items);
    // items.map(async (i)=>{
    //   // const algo = await InList(i.id);
    //   // let listas = await i.getLists();
    //   // listas = listas.map(l=> l.dataValues)
    //   // console.log(listas)
    //   console.log(i)
    // })

    let lists = await List.findAll();
    // lists = JSON.parse(JSON.stringify(lists));
    res.render("todos.pug", { TASKS: items, LISTS: lists });
  } catch (error) {
    console.error("Unable to connect to the database to get items:", error);
  }

});

router.post("/add", async (req, res, next) => {
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

});

router.post("/delete/:id", async (req, res, next) => {
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

  
});

router.post("/resolve/:id", async (req, res, next) => {
  try {
    await db.authenticate();

    const item = await Item.findByPk(req.params.id);
    item.state = "Resuelta";
    item.save().then(()=>{
      res.status(201).redirect("/");
    })
    // let items = await Item.findAll();
    // items = JSON.parse(JSON.stringify(items));
    // items = items.map(i => {
    //   {i.descrip}
    // })
    // res.render("todos.pug", { "TASKS": items });
  } catch (error) {
    console.error("Unable to connect to the database to delete item:", error);
  }

  
});

router.post("/unresolve/:id", async (req, res, next) => {
  try {
    await db.authenticate();

    const item = await Item.findByPk(req.params.id);
    item.state = "Sin resolver";
    item.save().then(()=>{
      res.status(201).redirect("/");
    })
    // let items = await Item.findAll();
    // items = JSON.parse(JSON.stringify(items));
    // items = items.map(i => {
    //   {i.descrip}
    // })
    // res.render("todos.pug", { "TASKS": items });
  } catch (error) {
    console.error("Unable to connect to the database to delete item:", error);
  }

  
});

module.exports = router;
