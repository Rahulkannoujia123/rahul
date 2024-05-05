const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
});

const category = new mongoose.model("category", categorySchema);
module.exports = category;
