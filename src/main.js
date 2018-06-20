const http = require("http");
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.write("<h1>Hello world!</h1>");
    res.end();
});

server.listen(port, () => {
    console.log("Server started on port", port);
});