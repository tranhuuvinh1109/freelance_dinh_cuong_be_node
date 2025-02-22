const express = require("express");
const AuthController = require("../app/controllers/AuthController");
const AuthMiddleware = require("../app/middleware/auth");
const router = express.Router();

router.post("/sign-in", AuthController.signIn);
router.post("/sign-up", AuthController.signUp);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/my-profile", AuthController.getMyProfile);

module.exports = router;
