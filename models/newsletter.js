const mongoose = require("mongoose");
const newsletterschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});
const order = mongoose.model("newsletter", newsletterschema);
module.exports = order;
