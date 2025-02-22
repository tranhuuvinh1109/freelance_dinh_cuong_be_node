const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    is_show: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", Category);
