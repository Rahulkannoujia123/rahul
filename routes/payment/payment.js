const express = require("express");
const router = new express.Router();
router.post("/payment", async (req, res) => {
  if (!req.body.amount)
    return res.json({
      success: false,
      message: "Please send order amount",
    });
  const razorpay = require("razorpay");
  var instance = new razorpay({
    key_id: process.env.RAZORPAY_KEYID,
    key_secret: process.env.RAZORPAY_KEYSECRET,
  });
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "kjsfhui",
  };
  instance.orders.create(options, async (err, order) => {
    if (order) {
      res.json({ success: true, order });
    } else {
      res.json({
        success: false,
        message: err,
      });
    }
  });
});
module.exports = router;
