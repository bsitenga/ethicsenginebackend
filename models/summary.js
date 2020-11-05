const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const summarySchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'summary'
    },
    total: {
        type: Number,
        required: true
    },
    more: {
        type: Number,
        required: true
    },
    less: {
        type: Number,
        required: true
    },
    action: {
        type: Number,
        required: true
    },
    inaction: {
        type: Number,
        required: true
    },
    known: {
        type: Number,
        required: true
    },
    unknown: {
        type: Number,
        required: true
    },
    pedestrians: {
        type: Number,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
});

const Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary;