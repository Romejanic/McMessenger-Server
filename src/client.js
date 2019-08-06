const https = require("https");
const crypto = require("crypto");

const MOJANG_AUTH_SERVER = "authserver.mojang.com";
const MOJANG_AUTH_VALIDATE = "/validate";

function Client(socket) {
    this.socket = socket;
    this.authenticated = false;
    this.uuid = null;
}

Client.prototype.authenticate = function(data) {
    const self = this;
    return new Promise((resolve) => {
        // check we aren't already authenticated
        if(this.authenticated) {
            resolve({ id: "already_authenticated" });
            return;
        }
        if(!data.auth_hash) {
            resolve({ id: "invalid_request" });
            return;
        }
        // construct the payload string
        let payload = JSON.stringify({
            accessToken: data.token
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
            if(res.statusCode === 204) {
                // check hash
                let sha = crypto.createHash("sha1");
                sha.update(data.token + data.uuid);
                let hash = sha.digest("base64").toString();
                if(hash !== data.auth_hash) {
                    resolve({
                        id: "authentication",
                        payload: {
                            success: false,
                            error: "invalid_token"
                        }
                    });
                    return;
                }
                // mark as authenticated, and validate with client
                self.authenticated = true;
                self.uuid = data.uuid;
                resolve({
                    id: "authentication",
                    payload: {
                        success: true
                    }
                });
            } else {
                resolve({
                    id: "authentication",
                    payload: {
                        success: false,
                        error: "invalid_token"
                    }
                });
            }
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