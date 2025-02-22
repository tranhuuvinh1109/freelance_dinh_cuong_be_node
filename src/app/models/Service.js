const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Service = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: String, maxlength: 255, required: true },
    discount: { type: Number, default: 0 },
    index: { type: Number, default: 0 },
    image: { type: String, default: "" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    is_show: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", Service);
