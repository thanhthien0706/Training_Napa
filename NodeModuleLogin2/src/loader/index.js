const ServerGlobal = require("./ServerGlobal");
const expressLoader = require("./express");
const passport = require("passport");
const HandlePassport = require("../services/plugins/Passport");

module.exports = async (app, expressApp) => {
  const serverGlobal = await ServerGlobal.getInstance();
  await expressLoader(app, expressApp);
  HandlePassport(passport);
};
