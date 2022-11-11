const TokenError = require("./TokenError");
const UserError = require("./UserError");
const FileError = require("./FileError");
const MailError = require("./MailError");
const RoleError = require("./RoleError");

module.exports = {
  existEmail: {
    status: 409,
    message: "Email Already Exists",
  },

  ...UserError,

  ...TokenError,

  ...FileError,

  ...MailError,

  ...RoleError,
};
