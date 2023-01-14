const express = require("express");
const router = express.Router();
const Portfolio = require("../models/portfolio");
const { verifyUser } = require("../middleware/common");
router.get("/portfolio", async (req, res) => {
  res.json({
    path: "portfolio",
  });
});
router.post("/portfolio", verifyUser, async (req, res) => {
  const { name, description, image } = req.body;
  const portfolio = new Portfolio({
    name,
    description,
    image,
  });
});
module.exports = router;
