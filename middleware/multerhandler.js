const multer = require("multer");
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.json({
            success: false,
            message: err.message,
        });
    } else {
        res.json({
            success: false,
        });
    }
};
module.exports = multerErrorHandler;
