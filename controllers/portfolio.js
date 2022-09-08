const express = require("express");
const router = express.Router();
const Portfolio = require("../models/portfolio");
router.get("/portfolio", async (req, res) => {
  res.send("portfolio");
});
router.post("/portfolio", async (req, res) => {
  const { name, description, image } = req.body;
  const portfolio = new Portfolio({
    name,
    description,
    image,
  });
});
module.exports = router;
