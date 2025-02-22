const mongoose = require("mongoose");

const reportedSchema = new mongoose.Schema({
  location: { type: String, default: "", trim: true },
  date_report: { type: String, default: "", trim: true },
  device: { type: String, default: "", trim: true },
  cable: { type: String, default: "", trim: true },
  power: { type: String, default: "", trim: true },
  report: { type: String, default: "", trim: true },
  other_job: { type: String, default: "", trim: true },
  exist: { type: String, default: "", trim: true },
  propose: { type: String, default: "", trim: true },
  creator: { type: String, default: "", trim: true },
  date: { type: String, default: "", trim: true },
  sv_device: { type: String, default: "", trim: true },
  sv_cable: { type: String, default: "", trim: true },
  sv_power: { type: String, default: "", trim: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const Reported = mongoose.model("Reported", reportedSchema);

module.exports = Reported;
