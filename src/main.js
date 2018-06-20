const http = require("http");
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.write("<h1>Hello world!</h1><p>" + req.url + "</p>");
    res.end();
});

server.listen(port, () => {
    console.log("Server started on localhost:", port);
});