const User = require("../models/user");
const Admin = require("../models/admin");
const db = require("../models/db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const findUser = async (req, res, next) => {
  if (!req.body.mail || !req.body.password) res.status(400).send();
  try {
    await db.authenticate();
    const user = await User.findOne({
      where: { email: req.body.mail },
    });
    // console.log(user);
    // console.log(req.body);
    if (!user) return res.status(404).send();

    bcrypt.compare(req.body.password, user.pass, async (err, result) => {
      if (!result) res.status(403).send();

      const admin = await Admin.findOne({
        where: {
          id_user: user.id,
        },
      });

      // console.log("----ADMIN: ", admin);

      req.session.admin = admin;

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
  if (!req.body.mail || !req.body.password || !req.body.name)
    res.status(400).send();
  try {
    await db.authenticate();
    const user = await User.findOne({
      where: { email: req.body.mail },
    });
    // console.log(req.body);
    if (user) res.status(403).send();

    let cryptopass;

    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      cryptopass = hash;
      await User.create({
        name: req.body.name,
        email: req.body.mail,
        pass: cryptopass,
      });

      console.log("----------> USER CREATED");

      res.status(201).send();
    });
  } catch (error) {
    console.error("Unable to connect to the database to add user: ", error);
  }
};

const logout = async (req, res, next) => {
  req.session = null;
  req.logout();
  console.log("----------> SESSION CLOSE");
  res.status(200).send();
};

module.exports = {
  findUser,
  addUser,
  logout,
};
