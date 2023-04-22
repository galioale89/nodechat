var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db');
var route = require('./routes')

var chatRoute = require('./routes/chat');

class App {

  constructor() {
    this.server = express();
    //db.connect();
    this.start();
    route(this.server);
    this.middlewares();
  }

  async start(){
    this.server.use(logger('dev'));
    // view engine setup
    this.server.set('views', path.join(__dirname, 'views'));
    this.server.set('view engine', 'ejs');

    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cookieParser());
    this.server.use(express.static(path.join(__dirname, 'public')));
  }
  
  async middlewares() {
    // catch 404 and forward to error handler
    this.server.use(function (req, res, next) {
      next(createError(404));
    });

    this.server.use('/chat',chatRoute);

    // error handler
    this.server.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
}

module.exports = new App().server;
