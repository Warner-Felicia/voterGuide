var mongoose = require('mongoose');

var candidateSchema = new mongoose.Schema({
  electionDate: {
    type: Date
  },
  counties: {
    type: Array
  },
  contestName: {
    type: String
  },
  nameOnBallot: {
    type: String
  },
  candidacyDate: {
    type: Date
  },
  voteFor: {
    type: Number
  },
  term: {
    type: Number
  },
  response: {
    type: Object
  },
  approved: {
    type: Boolean
  },
  category: {
    type: String
  },
  level: {
    type: String
  },
  judicial: {
    type: Boolean
  }
});

module.exports = mongoose.model('candidate', candidateSchema);