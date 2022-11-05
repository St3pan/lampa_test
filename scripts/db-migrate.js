const migrate = require('node-pg-migrate');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config();

const { db } = require('../config/constants');

const databaseUrl = db.connectionString;
const direction = 'up';
const dir = './migrations';
const migrationsTable = 'migrations';
const migrationsSchema = db.schema;

function main() {
  console.log('Running the migrations...');
  return migrate.default({
    databaseUrl,
    migrationsTable,
    migrationsSchema,
    direction,
    dir
  });
}

if (require.main === module) {
  main();
} else {
  module.exports = main;
}
