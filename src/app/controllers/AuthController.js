const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const CONFIG = require("../../config/env");

class AuthController {
  // [GET] /
  index(req, res) {
    res.send("Hey, this is my API running 🥳");
  }

  // [POST] /sign-up
  async signUp(req, res) {
    try {
      const { username, email, password, gender, address, phone } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        gender,
        address,
        phone,
      });

      await newUser.save();

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // [POST] /sign-in
  async signIn(req, res) {
    try {
      console.log("Sign In--");
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const accessToken = jwt.sign(
        { id: user._id, email: user.email, type: user.type },
        CONFIG.ACCESS_TOKEN_SECRET,
        { expiresIn: CONFIG.ACCESS_TOKEN_LIFE }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        CONFIG.ACCESS_TOKEN_SECRET,
        { expiresIn: CONFIG.REFRESH_TOKEN_LIFE }
      );

      user.refresh_token = refreshToken;
      await user.save();

      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;

      return res.status(200).json({
        message: "Login successful",
        data: {
          user: userWithoutPassword,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }

      jwt.verify(
        refreshToken,
        CONFIG.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return res
              .status(401)
              .json({ message: "Invalid or expired refresh token" });
          }

          const user = await User.findOne({
            _id: decoded.id,
            refresh_token: refreshToken,
          });
          if (!user) {
            return res
              .status(401)
              .json({ message: "Refresh token is not valid for any user" });
          }

          const newRefreshToken = jwt.sign(
            { id: user._id },
            CONFIG.ACCESS_TOKEN_SECRET,
            { expiresIn: CONFIG.REFRESH_TOKEN_LIFE }
          );

          user.refresh_token = newRefreshToken;
          await user.save();

          const newAccessToken = jwt.sign(
            { id: user._id, email: user.email, type: user.type },
            CONFIG.ACCESS_TOKEN_SECRET,
            { expiresIn: CONFIG.ACCESS_TOKEN_LIFE }
          );

          return res.status(200).json({
            message: "Token refreshed successfully",
            data: {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            },
          });
        }
      );
    } catch (error) {
      console.error("Error refreshing token:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getMyProfile(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Authorization token is required" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded.id).select(
        "-password -refresh_token"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error getting user profile:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
