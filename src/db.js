const { Client } = require("pg");
const devConfig = require("../dev_config.json");

let connectionString = process.env.DATABASE_URL | devConfig.database_url;

let client = new Client({
    connectionString: connectionString,
    ssl: connectionString !== devConfig.database_url
});

async function init() {
    console.log("Attempting to connect to database...");
    await client.connect();
    console.log("Connection established!");
    
    let res = await client.query("SELECT * FROM test");
    res.rows.forEach((val) => {
        console.log(val);
    });
}

module.exports = {
    init
};