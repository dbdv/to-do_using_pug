var jwt = require("jsonwebtoken");
const decode = require("jsonwebtoken/decode");

const isLogged = (req, res, next) => {
  const token = req.session.token;
  // console.log(token);
  if (!token) {
    console.log("----------> USER UNLOGGED");
    return res.status(401).redirect("/");
  }
  if (!jwt.verify(token, process.env.SECRET)) {
    console.log("----------> USER UNLOGGED");
    return res.status(401).redirect("/");
  }
  console.log("----------> USER LOGGED LET'S GO");
  next();
};

module.exports = {
  isLogged,
};
