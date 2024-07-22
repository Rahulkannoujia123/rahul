const express = require("express");
const { upload } = require("../utils/upload");
const router = express.Router();
router.post("/upload", upload.single("file"), (req, res) => {
    if (req.file) {
        res.json({
            success: true,
            file: {
                name: req.file.filename,
                url: `${process.env.APP_URL}/upload/${req.file.filename}`,
            },
        });
    } else {
        res.json({
            success: false,
            message: err.message,
        });
    }
});
module.exports = router;
