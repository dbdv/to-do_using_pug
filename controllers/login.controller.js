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
    res.status(200).send();
  } catch (error) {
    console.error("Unable to connect to the database to login: ", error);
  }
};

module.exports = {
  findUser,
};
