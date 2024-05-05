const express = require("express");
const router = new express.Router();
const Category = require("../../models/blog/category");
router.get("/category", async (req, res) => {
    try {
        const categories = await Category.find().populate("posts");
        return res.json({
            categories,
            success: true,
        });
    } catch (err) {
        return res.json({
            success: false,
            categories: [],
            message: err.message,
        });
    }
});
router.post("/category", async (req, res) => {
    const { name } = req.body;
    const category = new Category({
        name,
    });
    await category
        .save()
        .then(data => {
            res.status(201).json({
                category: data,
                success: true,
                message: "category created sucessfully",
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        });
});
router.delete("/category/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Category.deleteOne({ _id: id });
        return res.json({
            message: "Deleted",
            success: true,
        });
    } catch (err) {
        return res.json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;
