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
  }
});

module.exports = mongoose.model('candidate', candidateSchema);