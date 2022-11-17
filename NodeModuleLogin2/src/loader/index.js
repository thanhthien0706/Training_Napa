const ServerGlobal = require("./ServerGlobal");
const passport = require("passport");
const HandlePassport = require("../services/plugins/Passport");

module.exports = async () => {
  const serverGlobal = await ServerGlobal.getInstance();

  HandlePassport(passport);
};
