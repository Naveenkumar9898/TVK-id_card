const mongoose = require("mongoose");


const member = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    dob: {
        type: Number,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    pnumber: {
        type: Number,
        trim: true,
        required: true
    },
    legestic: {
        type: Number,
        trim: true,
        required: true
    },
    district: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: true
    },


})

module.exports = mongoose.model("member", member)