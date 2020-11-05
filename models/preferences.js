const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const preferencesSchema = new Schema({
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

const Preferences = mongoose.model('Preferences', preferencesSchema);

module.exports = Preferences;