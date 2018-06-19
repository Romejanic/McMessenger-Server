const net  = require("net");
const port = process.env.PORT || 8080;

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        console.log("[data]", data.toString());
    });
    socket.write("Hello from Heroku!");
});

server.listen(port, () => {
    console.log("Server started on port", port);
});