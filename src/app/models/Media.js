const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema(
  {
    location: { type: String, default: "", trim: true },
    name_ttcq: { type: String, default: "", trim: true },
    phone_staff: { type: String, default: "", trim: true },
    km: { type: String, default: "", trim: true },
    name: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    date: { type: String, default: "", trim: true },
    note: { type: String, default: "", trim: true },
  },
  {
    timestamps: { createdAt: "createAt", updatedAt: "updateAt" },
  }
);

module.exports = mongoose.model("Media", MediaSchema);
