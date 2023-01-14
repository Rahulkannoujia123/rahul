const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateTokens } = require("../utils/generateTokens");
const router = new express.Router();
const refreshTokens = [];
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const encriptedPassword = await bcrypt.hash(password, 10);
  try {
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser != null) {
      return res.json({ message: "user already exist" });
    } else {
      await new User({ name, email, password: encriptedPassword }).save(
        (err, data) => {
          if (err) {
            res.json({ error: err });
          } else {
            console.log(data);
            res.json({
              user: data,
            });
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({
      message: err || "inetrnal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const verifiedPassword = await bcrypt.compare(password, user.password);
    if (!user || !verifiedPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    } else {
      const { accessToken, refreshToken } = await generateTokens(user);
      res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        message: "Logged in sucessfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
router.post("/refresh", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      message: "user not authenticated",
    });
  } else {
    const { accessToken, refreshToken } = await generateTokens(user);
    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      message: "Logged in sucessfully",
    });
  }
});

module.exports = router;
