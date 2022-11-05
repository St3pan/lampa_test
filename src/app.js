const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const DB = require('./services/db');
const apiProducts = require('./routes/products');
const apiCategories = require('./routes/categories');

module.exports = async () => {
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const { db } = await DB();
  app.set('db', db);

  // Enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
  });

  app.use('/', apiProducts(app));
  app.use('/', apiCategories(app));

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err.message);
    // send the error response
    res.status(err.status || 500);
    res.json({ error: true, message: err.message });
  });

  return app;
};
