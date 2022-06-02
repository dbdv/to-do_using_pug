var express = require("express");
var router = express.Router();

//Controllers
const {
  getList,
  addList,
  removeItem,
  deleteItem,
  sortList,
} = require("../controllers/list.controller");

router.get("/:id", getList);

router.post("/add", addList);

router.post("/unlink/:id", removeItem);

router.post("/delete/:id", deleteItem);

router.get(`/:idList/orderBy/:ord1?/:ord2?/:ord3?/:direc`, sortList);

module.exports = router;
