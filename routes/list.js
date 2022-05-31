var express = require("express");
var router = express.Router();

// Mis modulos
var Item = require("../models/item.js");
var List = require("../models/list.js");
const InList = require("../models/in_list.js");
var db = require("../models/db");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // try {
  //   await db.authenticate();
  //   console.log("Connection has been established successfully.");
  //   let items = await Item.findAll({
  //     include: "Lists",
  //   });
  // } catch {}
});

router.get("/:id", async function (req, res, next) {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    let LISTS = await List.findAll();
    let list = await List.findByPk(req.params.id);
    const itemsOfList = await list.getItems();
    // console.log(list);
    res.render("list.pug", {
      list: list,
      LISTS: LISTS,
      ITEMS: itemsOfList,
    });
  } catch (error) {
    console.error(
      "Unable to connect to the database to get list by id: " + req.params.id,
      error
    );
  }
});

router.post("/add", async (req, res, next) => {
  console.log(req.body);
  try {
    await db.authenticate();

    const inserted = await List.create(req.body);

    res.status(201).redirect("/");
  } catch (error) {
    console.error("Unable to connect to the database to insert LIST:", error);
  }
});

router.post("/unlink/:id", async (req, res, next) => {
  try {
    // console.log(req)
    const id_list = req.body.id_list;
    const id_item = req.body.id_item;

    await db.authenticate();

    const link = await InList.findOne({
      where: { id_item: id_item, id_list: id_list },
    });

    console.log(link)

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
});

router.post("/delete/:id", async (req, res, next) => {
  try {
    
    await db.authenticate();

    const list = await List.findByPk(req.params.id);


    list.destroy().then(() => {
      res.redirect(201, "/");
    });
  } catch (error) {
    console.error("Unable to connect to the database to unlink item:", error);
  }
});

module.exports = router;
