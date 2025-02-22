const express = require("express");
const CategoryControler = require("../app/controllers/CategoryControler");
const AuthMiddleware = require("../app/middleware/auth");
const router = express.Router();

router.get("/", CategoryControler.getAll);
router.get("/:id", CategoryControler.getCategoryById);
router.post("/", AuthMiddleware.verifyToken, CategoryControler.createCategory);
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  CategoryControler.updateCategory
);
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  CategoryControler.deleteCategory
);

module.exports = router;
