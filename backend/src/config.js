const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const configuration = {
  DB_URL: process.env.DATABASE_URL,
  DB_PORT: process.env.PG_PORT,
  PORT: process.env.PORT,
};

module.exports = configuration;
