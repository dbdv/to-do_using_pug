// Lib de terceros
var express = require("express");
var router = express.Router();

//Controllers
const {
  addItem,
  deleteItem,
  markResolve,
  markResolving,
  markUnresolve,
} = require("../controllers/item.controller");

router.post("/add", addItem);

router.post("/delete/:id", deleteItem);

router.post("/markAsResolved/:id", markResolve);

router.post("/markAsUnresolve/:id", markUnresolve);

router.post("/markAsResolving/:id", markResolving);

module.exports = router;
