// require dependencies
const express = require("express");
const http    = require("http");
const ws      = require("ws");

// require modules
const sockets = require("./sockets");
const db      = require("./db");

// initialize everything
const app = express();
const server = http.createServer(app);
const wss    = new ws.Server({ server });

// express middleware
app.use(express.static("www"));

// WebSocket handlers
sockets(wss);

// connect to database and host 
const port = process.env.PORT || 8080;
db.init().then(() => {
    server.listen(port, () => {
        console.log("Server started on localhost:" + port);
    });
});