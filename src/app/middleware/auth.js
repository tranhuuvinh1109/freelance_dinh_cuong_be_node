const jwt = require("jsonwebtoken");
const CONFIG = require("../../config/env");

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token is required" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      req.user = decoded;
      next();
    });
  },
};

module.exports = authMiddleware;
