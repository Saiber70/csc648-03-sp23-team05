/**************************************************************
* Author: Mario Leyva Moreno
*
* File: app.js
*
* Description: The purpose of this file is to serve as the entry point
* for our application. It sets up a web server to handle HTTP requests
* and includes all the required node modules for our framework. It also exports
* all of our routers and includes any necessary middleware functions for our
* application.
*
**************************************************************/
var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions = require('express-session');
var mysqlSession = require('express-mysql-session')(sessions);
var handlebars = require("express-handlebars");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');
const flash = require('connect-flash');

const app = express();
//const port = 3000;

// sets up our handlebars structure
app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    extname: ".hbs",
    defaultLayout: "layout",
    helpers: {

    },
  })
);

var mysqlSessionStore = new mysqlSession(
  {

  },
  require('./conf/database')
);

// used to set up a session table in our database
app.use(sessions({
  key: "csid",
  secret: "my-secret-key",
  store: mysqlSessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

// session handler for login/logout
app.use((req, res, next) => {
  console.log(req.session);
  if(req.session.username){
    res.locals.logged = true;
  }
  next();
});

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// sets up all our routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);

// session handler for making search persistent across all pages (only search working)
app.use(function (req, res, next) {
  res.locals.searchTerm = req.session.searchTerm;
  res.locals.category = req.session.category;
  res.locals.filter = req.session.filter;
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, `The route ${req.url} does not exist.`));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = err;
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app
