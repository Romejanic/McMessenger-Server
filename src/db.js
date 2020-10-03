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
    console.log("[DB] Attempting to connect to database...");
    await client.connect();
    console.log("[DB] Connection established!");
    await initDatabase();
}

async function initDatabase() {
    await client.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, uuid TEXT NOT NULL, status_code INT, status_data TEXT, show_hat BOOL)");
    await client.query("CREATE TABLE IF NOT EXISTS messages (id INT UNIQUE PRIMARY KEY NOT NULL, content TEXT, sender INT, thread INT)");
    await client.query("CREATE TABLE IF NOT EXISTS message_threads (user_a INT, user_b INT)");
}

// load developer config from file (if it exists)
function loadDevConfig() {
    if(fs.existsSync("dev_config.json")) {
        let json = fs.readFileSync("dev_config.json");
        return JSON.parse(json);
    }
    return {};
}

// export methods
module.exports = {
    init
};