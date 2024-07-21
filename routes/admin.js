const express = require("express");
const User = require("../models/user");
const router = express.Router();
router.get("/admin", async (req, res) => {
    const users = await User.find();
    res.json({
        users,
        success: true,
    });
});

module.exports=router