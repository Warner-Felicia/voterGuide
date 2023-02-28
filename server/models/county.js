var mongoose = require('mongoose');

var countySchema = new mongoose.Schema({
    countyName: {
      type: String,
      required: true
    },
    favorite: {
      type: Boolean,
      required: true
    }
});

module.exports = mongoose.model('county', countySchema);