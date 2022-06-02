// Lib de terceros
var express = require("express");
var router = express.Router();

// Controllers
var { getHomeInfo, setOrder } = require("../controllers/todo.controller");

//Routes

router.get("/", getHomeInfo);
// router.get("/", async (req, res, next) => {
//   try {
//     await db.authenticate();
//     console.log("Connection has been established successfully.");
//     let items = await Item.findAll({
//       include: "Lists",
//     });
//     let lists = await List.findAll();
//     res.render("todos.pug", { TASKS: items, LISTS: lists });
//   } catch (error) {
//     console.error("Unable to connect to the database to get items:", error);
//   }
// });
router.get("/orderBy/:ord1?/:ord2?/:ord3?/:direc", setOrder);

module.exports = router;
