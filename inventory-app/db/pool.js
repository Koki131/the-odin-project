const { Pool } = require("pg");
require("dotenv").config();

const env = process.env;

module.exports = new Pool({
    host: `${env["database.host"]}`,
    user: `${env["database.user"]}`,
    database: `${env["database.name"]}`,
    password: `${env["database.password"]}`,
    port: 5432
});
