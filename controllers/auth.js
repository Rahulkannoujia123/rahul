const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const secret = process.env.TOKEN_SECRET;
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser !== null) {
      return res.status(400).json({
        message: "user already exists",
      });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const result = await User.create({
        email,
        name,
        password: hashedPass,
      });
      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
        },
        secret
      );
      res.status(201).json({
        user: {
          ...result,
          message: "registered Successfully",
          token,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      messgae: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const getuser = await User.findOne({
      email,
    });

    if (getuser == null) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      const matchPassword = await bcrypt.compare(password, getuser.password);
      if (!matchPassword) {
        res.status(404).json({
          message: "Invalid credentials",
        });
      } else {
        const token = await jwt.sign(
          {
            email: getuser.email,
            id: getuser._id,
          },
          secret
        );
        res.status(200).json({
          user: {
            ...getuser._doc,
            message: "loggedin success",
            token,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      messgae: "Internal server error",
    });
  }
});
module.exports = router;
