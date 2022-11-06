require('dotenv').config();
const db = require('./db');
const jwt = require('./jwt');

module.exports = {
  env: process.env.NODE_ENV,
  db,
  jwt
};
