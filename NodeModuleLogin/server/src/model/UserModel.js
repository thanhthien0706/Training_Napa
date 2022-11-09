const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const statusActive = {
  ACTIVE: 1,
  INACTIVE: 0,
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    local: {
      email: { type: String },
      password: { type: String },
    },
    github: {
      id: { type: String },
      token: { type: String },
      displayName: { type: String },
      username: { type: String },
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
    },
    activity: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = {
  UserModel: mongoose.model("Users", UserSchema),
  StatusActive: statusActive,
};
