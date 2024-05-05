const express = require("express");
const Order = require("../models/order");
const User = require("../models/user");

const router = new express.Router();
router.get("/dashboard", async (req, res) => {
    const userid = req.cookies._user;
    const user = await User.findOne({ _id: userid });
    const orders = await Order.find({ userid: userid });

    res.json({
        succes: true,
        dashboard: {
            user,
            orders,
        },
    });
});
module.exports = router;
