var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var logger = require("morgan");

require("dotenv").config();

var indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');
var todoRouter = require("./routes/todo");
var itemRouter = require("./routes/item");
var listRouter = require("./routes/list");
var loginRouter = require("./routes/login");

var { isLogged } = require("./middlewares/auth");

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

app.use("/", indexRouter);
// app.use('/users', usersRouter);
app.use("/todo", isLogged, todoRouter);
app.use("/list", isLogged, listRouter);
app.use("/item", isLogged, itemRouter);
app.use("/login", loginRouter);

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
