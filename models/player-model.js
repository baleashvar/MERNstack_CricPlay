const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema (
    {
        // img: { data: Buffer, contentType: String },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        batting: { type: Number, required: true },
        bowling: { type: Number, required: true },
        fielding: { type: Number, required: true },
        wk: { type: Boolean, required: true },
        highestscore: { type: Number, required: true },
        bestbowlfig: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('players', Player);