function getConnectionString() {
  const hostWithPort = `${process.env.DB_HOST}${process.env.DB_PORT ? `:${process.env.DB_PORT}` : ''}`;
  return `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${hostWithPort}/${process.env.DB_NAME}`;
}

module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  enableSSL: process.env.DB_ENABLE_SSL,
  connectionString: getConnectionString(),
  schema: 'public',
};
