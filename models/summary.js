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
    util: {
        type: Number,
        required: true
    },
    action: {
        type: Number,
        required: true
    },
    known: {
        type: Number,
        required: true
    },
    pedestrians: {
        type: Number,
        required: true
    }
});

const Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary;