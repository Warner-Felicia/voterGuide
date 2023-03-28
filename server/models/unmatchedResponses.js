var mongoose = require('mongoose');

var unmatchedResponsesSchema = new mongoose.Schema({
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
  }

});

module.exports = mongoose.model('unmatched-responses', unmatchedResponsesSchema);