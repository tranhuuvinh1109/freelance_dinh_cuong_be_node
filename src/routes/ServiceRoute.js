const express = require("express");
const ServiceController = require("../app/controllers/ServiceController");
const AuthMiddleware = require("../app/middleware/auth");
const router = express.Router();

router.get("/", ServiceController.getAll);
router.get("/:id", ServiceController.getServiceById);
router.post("/", AuthMiddleware.verifyToken, ServiceController.createService);
router.put("/:id", AuthMiddleware.verifyToken, ServiceController.updateService);
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  ServiceController.deleteService
);

module.exports = router;
