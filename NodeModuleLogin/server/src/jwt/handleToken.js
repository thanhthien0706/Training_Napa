const jwt = require("jsonwebtoken");
const { privateKey, publicKey } = require("../utils/keyJwt");

class HandleJwt {
  getToken(headers) {
    if (headers && headers.authorization != "") {
      if (headers.authorization) {
        const parted = headers.authorization.split(" ");
        if (parted.length === 2) {
          return parted[1];
        }
      }
    }
    return null;
  }

  async generateToken(data, options = "") {
    let token = await jwt.sign(data, privateKey, {
      ...options,
      algorithm: "RS256",
    });

    if (token) {
      return token;
    } else {
      return null;
    }
  }

  async verifyToken(token, options = "") {
    let data = await jwt.verify(token, publicKey, {
      ...options,
      algorithms: ["RS256"],
    });

    if (data) {
      return data;
    } else {
      return null;
    }
  }
}

module.exports = new HandleJwt();
