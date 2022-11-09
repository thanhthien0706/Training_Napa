const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenResetPasswordSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TokenRestPasswords", TokenResetPasswordSchema);
