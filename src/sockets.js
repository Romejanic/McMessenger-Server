module.exports = (wss) => {
    // on socket connection
    wss.on("connection", (socket, request) => {
        // on message recieved
        socket.on("message", (data) => {

        });
        // on close
        socket.on("close", (code, reason) => {

        });
        // on error
        socket.on("error", (err) => {
            
        });
    });
    // on server error
    wss.on("error", (err) => {
        console.error("[WSS] Unexpected server error:", err);
    });
};