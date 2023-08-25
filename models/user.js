const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type:String
  },
  phone: {
    type: String,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
  },
});

const user = new mongoose.model("user", userSchema);
module.exports = user;
