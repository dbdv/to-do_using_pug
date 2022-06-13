var express = require("express");
var router = express.Router();
var Category = require("../models/category");

router.post("/add", async function (req, res, next) {
  console.log(req.body);

  const category = await Category.findOne({
    where: {
      cat: req.body.category,
    },
  });

  if (!category)
    Category.create({
      cat: req.body.category,
    }).then(() => {
      res.status(201).send();
    });
  res.status(409).send();
});

module.exports = router;
