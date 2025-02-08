const { Client } = require("pg");
const { argv } = require("process");


const SQL = `
    DROP TABLE IF EXISTS product;
    DROP TABLE IF EXISTS category;
    CREATE TABLE category (
        category_id UUID DEFAULT gen_random_uuid(),
        category_name VARCHAR (55) UNIQUE,
        PRIMARY KEY (category_id)
    );

    CREATE TABLE product (
        product_id UUID DEFAULT gen_random_uuid(),
        name VARCHAR (55) UNIQUE,
        category_id UUID,
        description VARCHAR (255),
        quantity INT,
        image BYTEA,
        price MONEY,
        PRIMARY KEY (product_id),
        FOREIGN KEY (category_id) 
        REFERENCES category (category_id)
    );

`;

const main = async () => {

    console.log("seeding...");
    
    const client = new Client({
        connectionString: argv[2]
    });
    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done");
    
}

main();