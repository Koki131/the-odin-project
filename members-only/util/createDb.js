const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    DROP TABLE IF EXISTS articles;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
        id UUID DEFAULT gen_random_uuid(),
        username VARCHAR (255) UNIQUE,
        password VARCHAR (255),
        role VARCHAR (55),
        PRIMARY KEY (id)
    );

    CREATE TABLE articles (
        id UUID DEFAULT gen_random_uuid(),
        post TEXT,
        timestamp TIMESTAMP,
        user_id UUID,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) 
        REFERENCES users (id)
    );
    CREATE INDEX idx_timestamp ON articles (timestamp);
`;

const main = async () => {

    console.log("seeding...");

    const client = new Client({
        connectionString: process.env["database.url"]
    });
    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done");

}

main();
