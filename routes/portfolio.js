const express = require("express");
const router = express.Router();
const Portfolio = require("../models/portfolio");
const { verifyUser } = require("../middleware/common");
const httpcodes=require("../utils/httpcode");
router.get("/portfolio",verifyUser, async (req, res) => {
    try {
        const portfolio = await Portfolio.find();
        if (portfolio) {
            res.json({
                success: true,
                portfolio: portfolio,
            });
        } else {
            res.json({
                success: false,
                message: "Internal Server error",
            });
        }
    } catch {
        res.json({
            success: false,
            message: "Internal Server error",
        });
    }
});
router.post("/portfolio", verifyUser, async (req, res) => {
    const { title, description, image, url } = req.body;
    const portfolio = new Portfolio({
        title,
        description,
        image,
        url,
    });

    await portfolio.save((err, data) => {
        if (data) {
            res.json({
                success: true,
                message: "Portfolio added successfully",
            });
        } else {
            res.json({
                success: false,
                message: err.message || "Inetrnal server error",
            });
        }
    });
});
router.put("/portfolio/:id",verifyUser, async (req, res) => {
    const id = req.params.id;
    const result = await Portfolio.updateOne({ _id: id }, { ...req.body });
    if (result) {
        return res.json({
            success: true,
            message: "updated successfully",
        });
    }
   return res.json({
        success: false,
        message: httpcodes.success.message
    });
});
router.delete("/portfolio/:id", verifyUser, async (req, res) => {
    const id = req.params.id;
    isexist = await Portfolio.findOne({ _id: id });
    if (isexist) {
        const data = await Portfolio.deleteOne({ _id: id });
        if (data) {
            res.json({
                success: true,
                message: "Deleted Successfully",
            });
        } else {
            res.json({
                success: false,
                message: "Inetrnal server error",
            });
        }
    } else {
        res.json({
            success: false,
            isexist,
            message: "Already deleted",
        });
    }
});
module.exports = router;
