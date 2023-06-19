var mongoose = require('mongoose');

var contestCategorySchema = new mongoose.Schema({
  category: {
    type: String
  },
  searchTerms: {
    type: Array
  },
  level: {
    type: String
  },
  judicial: {
    type: Boolean
  }
});

module.exports = mongoose.model('contest-category', contestCategorySchema);