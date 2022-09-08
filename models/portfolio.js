const mongoose = require("mongoose");
const portfolioSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const portfolio = new mongoose.model("portfolio", portfolioSchema);
module.exports = portfolio;
