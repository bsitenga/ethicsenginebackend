const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const preferncesSchema = new Schema({
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

const Preferences = mongoose.model('Preferences', preferncesSchema);

module.exports = Preferences;