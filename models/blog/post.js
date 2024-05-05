const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    keywords: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    content: {
        type: String,
    },
    author: { type: Schema.Types.ObjectId, ref: "author" },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
    },
    status: {
        type: Boolean,
        default: true,
    },
    faq: {
        type: String,
    },
});

const post = new mongoose.model("post", postSchema);
module.exports = post;
