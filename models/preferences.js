const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const preferncesSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  
});

const Preferences = mongoose.model('Preferences', preferncesSchema);

module.exports = Preferences;