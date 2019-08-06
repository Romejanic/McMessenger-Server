const https = require("https");

const MOJANG_AUTH_SERVER = "authserver.mojang.com";
const MOJANG_AUTH_VALIDATE = "/validate";

function Client(socket) {
    this.socket = socket;
    this.authenticated = false;
}

Client.prototype.authenticate = (token) => {
    return new Promise((resolve) => {
        // check we aren't already authenticated
        if(this.authenticated) {
            resolve({ id: "already_authenticated" });
        }
        // construct the payload string
        let payload = JSON.stringify({
            accessToken: token 
        });
        // create the https request
        let options = {
            host: MOJANG_AUTH_SERVER,
            port: 443,
            path: MOJANG_AUTH_VALIDATE,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": payload.length
            }
        };
        let req = https.request(options, (res) => {
            // debug: print the response to console
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });
        // catch errors
        req.on("error", (err) => {
            console.error("Failed to request Mojang servers:", err);
        });
        // write the payload content to the server
        req.write(payload);
        req.end();
    });
};

module.exports = {
    Client
};