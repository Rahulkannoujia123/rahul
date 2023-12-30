const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  // userid: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  
  file: String,
  url: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
  },
});
const order = mongoose.model("order", orderSchema);
module.exports = order;
