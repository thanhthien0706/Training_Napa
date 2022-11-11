const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: { type: String },
    desciption: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("roles", RoleSchema);
