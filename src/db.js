const { Client } = require("pg");
const fs = require("fs");

// load configuration
const devConfig = loadDevConfig();
let connectionString = process.env.DATABASE_URL || devConfig.database_url;

// create client object
let client = new Client({
    connectionString: connectionString,
    ssl: connectionString !== devConfig.database_url
});

// connect to the database and initialize client
async function init() {
    console.log("Attempting to connect to database...");
    await client.connect();
    console.log("Connection established!");
    
    let res = await client.query("SELECT * FROM test");
    res.rows.forEach((val) => {
        console.log(val);
    });
}

// load developer config from file (if it exists)
function loadDevConfig() {
    if(fs.existsSync("../dev_config.json")) {
        let json = fs.readFileSync("../dev_config.json");
        return JSON.parse(json);
    }
    return {};
}

// export methods
module.exports = {
    init
};