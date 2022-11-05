require('dotenv').config();
const db = require('./db');

module.exports = {
  env: process.env.NODE_ENV,
  db
};
