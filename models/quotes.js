const mongoose = require('mongoose');
const Schema = mongoose.Schema


const quoteSchema = new Schema ({
    category: {
        type: String,
        lowercase: true,
        enum: ['motivational', 'funny', 'islamic', 'christian', 'pidgin'],
        required: true
    },
    body: {
        type: String,
        required: [true, 'Body can not be blank'],
    },
    author: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Quote", quoteSchema);


