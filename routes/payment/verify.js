const express = require("express");
const crypto = require("crypto");
const router = new express.Router();
router.post("/verifypayment", async (req, res) => {
  const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEYSECRET)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === req.body.razorpay_signature) {
    res.json({
      success: true,
      message:"Payment done"
    });
  } else {
    res.json({
      success: false,
    });
  }
});

module.exports = router;
