const massive = require('massive');
const { db } = require('../../config/constants');

module.exports = async () => {
  // connect to Massive and get the db instance
  const instance = await massive(db.connectionString, {
    // explicitly specify the used schemas
    allowedSchemas: [db.schema]
  });

  return { db: instance };
};
