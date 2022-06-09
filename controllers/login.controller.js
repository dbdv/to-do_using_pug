const User = require("../models/user");
const db = require("../models/db");

const findUser = async (req, res, next) => {
  try {
    await db.authenticate();
    const user = await User.findOne({
      where: { email: req.body.mail },
    });
    console.log(user);
    console.log(req.body);
    if (!user) res.status(404).send();
    if (user.pass !== req.body.password) res.status(403).send();
    req.session.token = "ok";
    req.session.userID = user.id;
    req.session.userName = user.name;
    res.status(200).send();
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

    await User.create({
      name: req.body.name,
      email: req.body.mail,
      pass: req.body.password,
    });
    res.status(201).send();
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
