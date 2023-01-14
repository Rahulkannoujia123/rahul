const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
});

const post = new mongoose.model("post", userSchema);
module.exports = post;
