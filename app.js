var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var logger = require("morgan");
var passport = require("passport");

require("dotenv").config();

var indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');
var todoRouter = require("./routes/todo");
var itemRouter = require("./routes/item");
var listRouter = require("./routes/list");
var loginRouter = require("./routes/login");
var authRouter = require("./routes/auth");
var categoryRouter = require("./routes/category");

//middlewares
var { isLogged } = require("./middlewares/auth");

//passport config

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({ keys: ["order"] }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//------------ TEST
app.use(passport.initialize());
app.use(passport.session());
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        // console.log(profile);
        return done(null, profile);
      });
    }
  )
);

//--------------- END TEST
app.use("/", indexRouter);
// app.use('/users', usersRouter);
app.use("/login", loginRouter);
app.use("/todo", isLogged, todoRouter);
app.use("/list", isLogged, listRouter);
app.use("/item", isLogged, itemRouter);
app.use("/category", isLogged, categoryRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
