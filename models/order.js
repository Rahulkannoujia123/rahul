const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required:true
    },

    file: String,
    url: String,
    date: {
        type: Date,
        default: Date.now,
    },
    whatsapp:{
        type:Number
    },
    status: {
        type: Number,
    },
    paid: {
        type: Boolean,
        default: false,
    },
});
const order = mongoose.model("order", orderSchema);
module.exports = order;
