const express = require("express");
const http    = require("http");

const app = express();
const server = http.createServer(app);

app.use(express.static("www"));

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log("Server started on localhost:" + port);
});