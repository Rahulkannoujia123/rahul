const express = require("express");
const Order = require("../models/order");
const router = new express.Router();
router.post("/order", async (req, res) => {
  const { description, userid, file, url, mobile } = req.body;
  const order = new Order({
    userid,
    description,
    file,
    url,
    mobile,
  });
  order
    .save()
    .then((data) => {
      res.status(201).json({
        order: {
          order: data,
          message: "order created sucessfully",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        messgae: "Internal server error",
      });
    });
});

router.get("/order", async (req, res) => {
  Order.find((err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({
        messgae: "Internal Server error",
        status: 500,
      });
    }
  });
});
module.exports = router;
