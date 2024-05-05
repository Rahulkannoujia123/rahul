const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    info: {
        type: String,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
});

const author = new mongoose.model("author", authorSchema);
module.exports = author;
