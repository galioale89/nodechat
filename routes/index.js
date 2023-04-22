var express = require('express');
var chat = require('./chat');
var users = require('./users');


/* GET home page. */
const route = (app) => {
  // view engine setup
  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.route('/').get((_, res, next) => {
    res.render('index', { title: 'Express' });
  });

  app.use('/chat', chat)
  app.use('/users', users)
}

module.exports = route;
