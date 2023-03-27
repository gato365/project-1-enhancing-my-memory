const { Schema, Types, model } = require('mongoose');


// Save date, percentage,time, entered text selected Letters, selectedNumbers, currentLine
const scoreSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now,
        },
        percentage: {
            type: Number,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        enteredText: {
            type: String,
            required: true,
        },
        selectedLetters: {
            type: String,
            required: true,
        },
        selectedNumbers: {
            type: String,
            required: true,
        },
        currentLine: {
            type: Number,
            required: true,
        },
        // This is the reference to the user that created this score
        // user: { type: Types.ObjectId, ref: 'User' },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);


module.exports = model('Score', scoreSchema);





