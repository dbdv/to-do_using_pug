var jwt = require("jsonwebtoken");
const decode = require("jsonwebtoken/decode");

const isLogged = (req, res, next) => {
  const token = req.session.token;
  if (!token) res.status(401).redirect("/");
  // const decoded = jwt.verify(token, process.env.SECRET);
  console.log("----------> USER LOGGED");
  next();
};

module.exports = {
  isLogged,
};
