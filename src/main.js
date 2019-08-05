const express = require("express");
const http    = require("http");
const ws      = require("ws");

// initialize everything
const app = express();
const server = http.createServer(app);
const wss    = new ws.Server({ server });

// express middleware
app.use(express.static("www"));

// WebSocket handlers
wss.on("connection", (socket) => {
    console.log("connection recieved from " + socket.url);
    socket.on("message", (data) => {
        socket.send(data);
    });
    socket.send("welcome to my server!");
});

// host server
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log("Server started on localhost:" + port);
});