const express = require("express");
const router = new express.Router();
router.get("/author", async (req, res) => {
  res.json({
    success: true,
    author: "author",
  });
});
router.post("/author", async (req, res) => {});
router.patch("/author", async (req, res) => {});
router.delete("/author", async (req, res) => {});
