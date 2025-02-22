const Category = require("../models/Category");

class CategoryController {
  // [GET] /
  async getAll(req, res) {
    try {
      const categories = await Category.find({ is_show: true });

      if (categories.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No categories found" });
      }

      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [GET] /:id
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id, is_show: true });
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.status(200).json({ success: true, data: category });
    } catch (error) {
      console.error("Error fetching category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [POST] /
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      console.error("Error creating category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [PUT] /:id
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description, is_show } = req.body;

      const updateData = { name, description };
      if (typeof is_show === "boolean") {
        updateData.is_show = is_show;
      }

      const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
      console.error("Error updating category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [DELETE] /:id
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const deletedCategory = await Category.findByIdAndUpdate(
        id,
        { is_show: false },
        { new: true }
      );

      if (!deletedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.status(200).json({
        success: true,
        message: "Category marked as not shown successfully",
        data: deletedCategory,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new CategoryController();
