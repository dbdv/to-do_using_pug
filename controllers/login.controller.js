const User = require("../models/user");
const db = require("../models/db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const findUser = async (req, res, next) => {
  try {
    await db.authenticate();
    const user = await User.findOne({
      where: { email: req.body.mail },
    });
    // console.log(user);
    // console.log(req.body);
    if (!user) res.status(404).send();
    bcrypt.compare(req.body.password, user.pass, (err, result) => {
      if (!result) res.status(403).send();

      req.session.token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      req.session.userID = user.id;
      req.session.userName = user.name;
      setTimeout(() => {
        res.status(200).send();
      }, 3000);
    });
  } catch (error) {
    console.error("Unable to connect to the database to login: ", error);
  }
};

const addUser = async (req, res, next) => {
  try {
    await db.authenticate();
    const user = await User.findOne({
      where: { email: req.body.mail },
    });
    console.log(req.body);
    if (user) res.status(403).send();

    let cryptopass;

    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      cryptopass = hash;
      await User.create({
        name: req.body.name,
        email: req.body.mail,
        pass: cryptopass,
      });
      res.status(201).send();
    });
  } catch (error) {
    console.error("Unable to connect to the database to add user: ", error);
  }
};

const logout = async (req, res, next) => {
  req.session = null;
  res.status(200).send();
};

module.exports = {
  findUser,
  addUser,
  logout,
};
