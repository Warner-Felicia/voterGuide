const csv = require('csvtojson');
const Candidate = require('../models/candidate');
const UnmatchedResponses = require('../models/unmatchedResponses');

module.exports.getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find().sort({ nameOnBallot: 1 });
    res.status(200).json({
      message: 'Candidates successfully fetched',
      candidates: candidates
    })
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch candidates',
      error: error
    })
  }
}

module.exports.postUploadCandidates = async (req, res, next) => {
  //turn csv into json 
  const responseData = await csv().fromFile(req.file.path);
  const counties = req.body.counties;
  const trackPrimary = req.body.trackPrimary.toUpperCase();

  //arrays to store candidates
  const candidates = [];
  const newCandidates = [];

  //loop through json data to create array of candidates 
  for (let response of responseData) {

    //filter for desired counties and if primary or general election
    if (counties.includes(response.county_name) && trackPrimary === response.has_primary) {
      
      try {
        const result = await Candidate.findOneAndUpdate(
          {
            electionDate: new Date(response.election_dt),
            contestName: response.contest_name,
            nameOnBallot: response.name_on_ballot
          },
          {
            electionDate: new Date(response.election_dt),
            $addToSet: { counties: response.county_name },
            contestName: response.contest_name,
            nameOnBallot: response.name_on_ballot,
            candidacyDate: response.candidacy_dt,
            voteFor: response.vote_for,
            term: response.term,
            approved: false
          },
          { upsert: true, rawResult: true, new: true }
        );
        if (!result.lastErrorObject.updatedExisting) {
          newCandidates.push(result.value);
          candidates.push(result.value);
        } else {
          candidates.push(result.value);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  res.status(200).json({
    message: 'CSV successfully uploaded',
    newCandidates: newCandidates,
    candidates: candidates
  })
}

module.exports.getCandidatesToReview = async (req, res, next) => {
  try {
    candidatesToReview = await Candidate.find({ approved: false, response: { $exists: true} });
    res.status(200).json({
      message: 'Review candidates successfully fetched',
      candidates: candidatesToReview
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports.putUpdateAndApproveCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.body._id, { response: req.body.response, approved: req.body.approved },)
    res.status(200).json({
      message: 'Response updated',
      candidate: candidate
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.getUnmatchedResponses = async (req, res, next) => {
  try {
    const unmatchedResponses = await UnmatchedResponses.find();
    res.status(200).json({
      message: 'Unmatched responses successfully fetched',
      unmatchedResponses: unmatchedResponses
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports.putUpdateCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.body._id, req.body );
    res.status(200).json({
      message: 'Candidate response sucessfully updated',
      candidate: candidate
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports.deleteUnmatchedResponse = async (req, res, next) => {
  try {
      const result = await UnmatchedResponses.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Unmatched response succesfully deleted"});
    } catch (err) {
    console.log(err);
  }
  
}
