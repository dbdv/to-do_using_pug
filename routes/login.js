var express = require("express");
var router = express.Router();

const {
  findUser,
  addUser,
  logout,
} = require("../controllers/login.controller");

router.post("/in", findUser);
router.post("/sign", addUser);
router.post("/out", logout);

module.exports = router;
