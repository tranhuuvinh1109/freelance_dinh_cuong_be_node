const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanPatrolSchema = new Schema(
  {
    location: { type: String, default: "" },
    date: { type: String, default: "" },
    address: { type: String, default: "" },
    cable_line: { type: String, default: "" },
    name_staff: { type: String, default: "" },
    phone_staff: { type: String, default: "" },
    result: { type: String, default: "" },
    plan: { type: String, default: "" },
    description: { type: String, default: "" },
    construction_unit_information: { type: String, default: "" },
    affect: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PlanPatrol", PlanPatrolSchema);
