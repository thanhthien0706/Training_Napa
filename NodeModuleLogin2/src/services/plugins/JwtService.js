const jwt = require("jsonwebtoken");

class JwtService {
  getToken(headers) {
    if (headers && headers.authorization != "") {
      if (headers.authorization) {
        const parted = headers.authorization.split(" ");
        if (parted.length === 2) {
          return parted[1];
        }
      }
    }
    throw new Error("tokenNotFound");
  }

  async generateToken(data, options = {}) {
    try {
      let token = await jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "30 days",
        ...options,
      });

      if (token) {
        return token;
      }
    } catch (error) {
      throw new Error("notGeneratedToken");
    }
  }

  async verifyToken(token, options = {}) {
    try {
      let data = await jwt.verify(token, process.env.JWT_SECRET, {
        ...options,
      });

      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("notVerifyToken");
    }
  }
}

module.exports = new JwtService();
