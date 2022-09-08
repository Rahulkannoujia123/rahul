const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: String,
});

const user = new mongoose.model("user", userSchema);
module.exports = user;
