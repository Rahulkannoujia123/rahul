const express = require("express");
const { verify } = require("jsonwebtoken");
const Order = require("../models/order");
const { verifyUser } = require("../middleware/common");
const router = new express.Router();
router.post("/order", async (req, res) => {
  const { description, userid, file, url, mobile, status } = req.body;
  const order = new Order({
    userid,
    description,
    file,
    url,
    mobile,
    status,
  });
  await order
    .save()
    .then((data) => {
      res.status(201).json({
        order: data,
        success: true,
        message: "order created sucessfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        messgae: "Internal server error",
      });
    });
});

router.get("/order", verifyUser, async (req, res) => {
  const order = await Order.find();
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(500).json({
      success: false,
      message: "Inetrnal server error",
    });
  }
});
router.get("/order/:id", verifyUser, async (req, res) => {
  Order.findOne({ _id: req.params.id }, (err, data) => {
    if (data) {
      res.status(200).json({
        success: true,
        order: data,
      });
    } else {
      res.status(500).json({
        success: false,
        messgae: "Internal Server error",
        status: 500,
      });
    }
  });
});
module.exports = router;
