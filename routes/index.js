var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //res.render('index', { title: 'Express' });
  req.session.order = null;
  res.render("login.pug");
});

module.exports = router;
