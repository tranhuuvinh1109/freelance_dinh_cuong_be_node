const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, maxlength: 255, required: true },
    avatar: { type: String, default: "" },
    gender: { type: Number, default: 1 },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    type: { type: Number, required: false, default: 0 },
    refresh_token: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
