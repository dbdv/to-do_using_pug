var express = require("express");
var router = express.Router();

const { findUser, logout } = require("../controllers/login.controller");

router.post("/in", findUser);
router.post("/out", logout);

module.exports = router;
