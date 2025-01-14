const express = require("express");
const { verify } = require("jsonwebtoken");
const Order = require("../models/order");
const { verifyUser } = require("../middleware/common");

const router = new express.Router();
router.post("/order", verifyUser, async (req, res) => {
    const { description, file, url, whatsapp, status, userid } = req.body;
    const order = new Order({
        description,
        file,
        url,
        whatsapp,
        status,
        userid,
    });
    await order
        .save()
        .then(data => {
            res.status(201).json({
                order: data,
                success: true,
                message: "order created sucessfully",
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        });
});

router.get("/order", verifyUser, async (req, res, next) => {
    await Order.find({ userid: req.cookies._user }, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "500",
            });
        } else {
            return res.json({
                order: data,
            });
        }
    });
});
router.get("/order/:id", async (req, res) => {
    await Order.findOne({ _id: req.params.id }, (err, data) => {
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
router.patch("/order/:id", verifyUser, async (req, res,next) => {
    Order.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, (err, data) => {
        if (data) {
            res.status(200).json({
                success: true,
                message: "order updated",
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
