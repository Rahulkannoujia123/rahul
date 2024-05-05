const mongoose = require("mongoose");
const userTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

const userToken = new mongoose.model("userToken", userTokenSchema);

module.exports = { userToken };
