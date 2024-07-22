const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { verifyUser } = require("../middleware/common");

router.get("/profile", verifyUser, async (req, res) => {
    const user = await User.findOne({ _id: req.cookies._user });
    res.cookie("name", "ashish-yadav", { maxAge: 1000 * 60 * 10, httpOnly: false }).json({
        user,
        success: true,
        message: "successfull",
    });
});
module.exports = router;
