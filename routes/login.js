var express = require("express");
var router = express.Router();

const { findUser } = require("../controllers/login.controller");

router.post("/in", findUser);

module.exports = router;
