const express = require("express");
const app = express();
const multer = require("multer");
const router = express.Router();
const path = require("path");
const { verifyUser } = require("../middleware/common");
const storage = multer.diskStorage({
  destination: "./upload/images/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}-${new Date()
        .toDateString()
        .replace(/ /g, "-")}${path.extname(file.originalname)}`
    );
  },
});
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.json({
      message: err.message,
    });
  }
};
app.use(multerErrorHandler);
const upload = multer({ storage: storage, limits: { fileSize: 500000 } });
router.post("/upload", verifyUser, upload.single("profile"), (req, res) => {
  console.log(req.file);
  res.json({
    name: req.file.filename,
    url: `http://localhost:4000/images/${req.file.filename}`,
  });
});
module.exports = router;
