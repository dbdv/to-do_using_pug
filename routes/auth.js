var express = require("express");
var router = express.Router();
var passport = require("passport");

const User = require("../models/user");
const db = require("../models/db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async function (req, res) {
    try {
      await db.authenticate();
      const [user, created] = await User.findOrCreate({
        where: { email: req.user.id },
        defaults: {
          name: req.user.displayName,
          pass: "",
        },
      });
      console.log("CALLBAK DE GITHUB PASSPORT");
      // console.log("CREATED: ", created);
      // console.log("USER: ", user);
      req.session.token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      req.session.userID = user.id;
      req.session.userName = user.name;
      req.session.admin = null;
    } catch (error) {
      console.error(
        "Unable to connect to the database to login with github: ",
        error
      );
    }
    // console.log(req.user.id);
    // console.log(req.user.displayName);
    // console.log(req.user);
    res.redirect("/todo");
  }
);

module.exports = router;
