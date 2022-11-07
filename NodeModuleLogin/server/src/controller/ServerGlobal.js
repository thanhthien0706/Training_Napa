const mongoose = require("mongoose");
const RoleController = require("./RoleController");

class ServerGlobal {
  static _instance;

  constructor() {
    mongoose
      .connect(process.env.DB_ENDPOINT, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Connect mongo successfully ");
        RoleController.initData();
      })
      .catch((e) => {
        console.log("Connect mongo failed: " + e.message);
      });
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new ServerGlobal();
    return this._instance;
  }
}

module.exports = ServerGlobal;
