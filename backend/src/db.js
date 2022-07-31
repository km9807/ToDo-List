const { Client } = require("pg");
const config = require("./config");

const client = new Client({
  connectionString: config.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = client;
