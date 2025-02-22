const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableAppendixSchema = new Schema(
  {
    address: { type: String, default: "", trim: true },
    system: { type: String, default: "", trim: true },
    cable_qh: { type: String, default: "", trim: true },
    cable_uc: { type: String, default: "", trim: true },
    time_move: { type: String, default: "", trim: true },
    time_back: { type: String, default: "", trim: true },
    reason: { type: String, default: "", trim: true },
    note: { type: String, default: "", trim: true },
  },
  {
    timestamps: { createdAt: "createAt", updatedAt: "updateAt" },
  }
);

module.exports = mongoose.model("TableAppendix", TableAppendixSchema);
