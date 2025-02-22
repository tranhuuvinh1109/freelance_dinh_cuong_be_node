const TableAppendix = require("../models/Appendix");

class TableAppendixController {
  async createAppendix(req, res) {
    try {
      const newAppendix = new TableAppendix(req.body);
      const savedAppendix = await newAppendix.save();
      res.status(201).json({
        status: 200,
        message: "Create new appendix successfully",
        data: savedAppendix,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: "Create new appendix failed, please try again",
        data: error.message,
      });
    }
  }

  async getAllAppendices(req, res) {
    try {
      const appendices = await TableAppendix.find().sort({ createAt: -1 });
      res.status(200).json({
        status: 200,
        message: "Retrieve all appendices successfully",
        data: appendices,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAppendixById(req, res) {
    try {
      const appendix = await TableAppendix.findById(req.params.id);
      if (!appendix) {
        return res.status(404).json({
          status: 404,
          message: `Appendix with id ${req.params.id} does not exist`,
          data: null,
        });
      }
      res.status(200).json({
        status: 200,
        message: `Retrieve appendix with id ${req.params.id} successfully`,
        data: appendix,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateAppendix(req, res) {
    try {
      const updatedAppendix = await TableAppendix.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedAppendix) {
        return res.status(404).json({
          status: 404,
          message: `Appendix with id ${req.params.id} does not exist`,
          data: null,
        });
      }
      res.status(200).json({
        status: 200,
        message: `Update appendix with id ${req.params.id} successfully`,
        data: updatedAppendix,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: `Update appendix with id ${req.params.id} failed, please try again`,
        data: error.message,
      });
    }
  }

  async deleteAppendix(req, res) {
    try {
      const deletedAppendix = await TableAppendix.findByIdAndDelete(
        req.params.id
      );
      if (!deletedAppendix) {
        return res.status(404).json({
          status: 404,
          message: `Appendix with id ${req.params.id} does not exist`,
          data: null,
        });
      }
      res.status(200).json({
        status: 200,
        message: `Delete appendix with id ${req.params.id} successfully`,
        data: null,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteAllAppendices(req, res) {
    try {
      await TableAppendix.deleteMany();
      res
        .status(204)
        .json({ message: "All Table Appendix deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TableAppendixController();
