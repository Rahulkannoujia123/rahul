const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    syllabus:[],
    image: {
        type: String,
    },
});
