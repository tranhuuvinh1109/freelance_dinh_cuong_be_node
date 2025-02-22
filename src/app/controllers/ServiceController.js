const Service = require("../models/Service");
const Category = require("../models/Category");

class ServiceController {
  // [GET] /
  async getAll(req, res) {
    try {
      const services = await Service.find({ is_show: true })
        .populate("category", "name description")
        .exec();

      if (services.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No services found" });
      }

      res.status(200).json({ success: true, data: services });
    } catch (error) {
      console.error("Error fetching services:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [GET] /:id
  async getServiceById(req, res) {
    try {
      const { id } = req.params;

      const service = await Service.findOne({ _id: id, is_show: true })
        .populate("category", "name description")
        .exec();

      if (!service) {
        return res
          .status(404)
          .json({ success: false, message: "Service not found" });
      }

      res.status(200).json({ success: true, data: service });
    } catch (error) {
      console.error("Error fetching service:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [POST] /
  async createService(req, res) {
    try {
      const { name, description, price, discount, image, category } = req.body;

      const categoryExists = await Category.findOne({
        _id: category,
        is_show: true,
      });
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      const service = new Service({
        name,
        description,
        price,
        discount,
        image,
        category,
      });

      await service.save();

      res.status(201).json({
        success: true,
        message: "Service created successfully",
        data: service,
      });
    } catch (error) {
      console.error("Error creating service:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [PUT] /:id
  async updateService(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const service = await Service.findOneAndUpdate({ _id: id }, updates, {
        new: true,
      });

      if (!service) {
        return res
          .status(404)
          .json({ success: false, message: "Service not found" });
      }

      res.status(200).json({
        success: true,
        message: "Service updated successfully",
        data: service,
      });
    } catch (error) {
      console.error("Error updating service:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [DELETE] /:id
  async deleteService(req, res) {
    try {
      const { id } = req.params;

      const service = await Service.findOneAndUpdate(
        { _id: id },
        { is_show: false },
        { new: true }
      );

      if (!service) {
        return res
          .status(404)
          .json({ success: false, message: "Service not found" });
      }

      res.status(200).json({
        success: true,
        message: "Service deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new ServiceController();
