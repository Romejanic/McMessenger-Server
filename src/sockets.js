const { Client } = require("./client");

function processPacket(client, packet, socket) {

}

module.exports = (wss) => {
    // on socket connection
    wss.on("connection", (socket, request) => {
        let client = new Client(socket);
        // on message recieved
        socket.on("message", (data) => {
            let packet = JSON.parse(data.toString());
            if(!client.authenticated) {
                if(packet.id === "authenticate") {
                     // packet.payload is the mojang access token
                    client.authenticate(packet.payload);
                } else {
                    client.sendPacket("request_auth");
                }
            } else {
                processPacket(client, packet, socket);
            }
        });
        // on close
        socket.on("close", (code, reason) => {

        });
        // on error
        socket.on("error", (err) => {

        });
        // define packet sending
        socket.sendPacket = (id, payload) => {
            let packetObj = {};
            if(id) { packetObj.id = id; }
            if(payload) { packetObj.payload = payload; }
            socket.sendPacketObj(packetObj);
        };
        socket.sendPacketObj = (packetObj) => {
            socket.send(JSON.stringify(packetObj));
        };
        // request authentication
        socket.sendPacket("request_auth");
    });
    // on server error
    wss.on("error", (err) => {
        console.error("[WSS] Unexpected server error:", err);
    });
};