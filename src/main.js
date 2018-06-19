const http = require("http");

const server = http.createServer((req, res) => {
    res.write("<h1>Testing</h1>");
    res.end();
});

server.listen(80, () => {
    console.log("Server started");
});