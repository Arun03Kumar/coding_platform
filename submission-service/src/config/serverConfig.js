const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  NODE_ENV: process.env.NODE_ENV,
};
