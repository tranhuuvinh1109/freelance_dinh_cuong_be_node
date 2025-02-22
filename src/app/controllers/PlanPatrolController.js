const PlanPatrol = require("../models/PlanPatrol");
const path = require("path");
const { EXCEL_PATH } = require("../../constant/common");

class PlanPatrolController {
  // Create Plan
  async create(req, res) {
    try {
      const plan = await PlanPatrol.create(req.body);
      res
        .status(201)
        .json({ message: "Plan created successfully", data: plan });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get All Plans
  async getAll(req, res) {
    try {
      const plans = await PlanPatrol.find().sort("-date");
      res.status(200).json({ data: plans });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get Plan by ID
  async getById(req, res) {
    try {
      const plan = await PlanPatrol.findById(req.params.planId);
      if (!plan) return res.status(404).json({ message: "Plan not found" });
      res.status(200).json({ data: plan });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update Plan
  async update(req, res) {
    try {
      const plan = await PlanPatrol.findByIdAndUpdate(
        req.params.planId,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!plan) return res.status(404).json({ message: "Plan not found" });
      res
        .status(200)
        .json({ message: "Plan updated successfully", data: plan });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete Plan
  async delete(req, res) {
    try {
      const plan = await PlanPatrol.findByIdAndDelete(req.params.planId);
      if (!plan) return res.status(404).json({ message: "Plan not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get Plans Formatted by Location
  async getFormatted(req, res) {
    try {
      const plans = await PlanPatrol.find();
      const groupedData = plans.reduce((acc, plan) => {
        const location = plan.location;
        if (!acc[location]) acc[location] = [];
        acc[location].push(plan);
        return acc;
      }, {});
      const finalData = Object.entries(groupedData).map(([location, data]) => ({
        location,
        data,
      }));
      res.status(200).json({ data: finalData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete All Plans
  async deleteAll(req, res) {
    try {
      await PlanPatrol.deleteMany();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PlanPatrolController();
