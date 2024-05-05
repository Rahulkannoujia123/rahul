const multer = require("multer");
const storage = multer.diskStorage({
    destination: "./upload",
    filename: (req, file, cb) => {
        return cb(
            null,
            `${file.fieldname}-${new Date().toDateString().replace(/ /g, "-")}${file.originalname}`
        );
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
});
module.exports = { upload };
