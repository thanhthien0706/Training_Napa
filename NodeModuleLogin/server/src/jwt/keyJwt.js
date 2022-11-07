const fs = require("fs");

const privateKey = fs.readFileSync("./src/key/private.pem");
const publicKey = fs.readFileSync("./src/key/publickey.crt");

module.exports = { privateKey, publicKey };
