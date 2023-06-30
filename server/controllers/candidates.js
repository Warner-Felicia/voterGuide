const csv = require('csvtojson');
const Candidate = require('../models/candidate');
const UnmatchedResponses = require('../models/unmatchedResponses');
const helperFunctions = require('../util/helperFunctions');

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
  const uncategorizedRaces = [];

  //loop through json data to create array of candidates 
  for (let response of responseData) {

    //filter for desired counties and if primary or general election
    if (counties.includes(response.county_name) && trackPrimary === response.has_primary) {

      //assign category, level and judicial/non-judicial information
      const updatedResponse = await helperFunctions.assignGroupingData(response);
      if (!updatedResponse.category) {
        if (!uncategorizedRaces.includes(updatedResponse.contest_name)){
          uncategorizedRaces.push(updatedResponse.contest_name);
        }
      }
      try {
        const result = await Candidate.findOneAndUpdate(
          {
            electionDate: new Date(updatedResponse.election_dt),
            contestName: updatedResponse.contest_name,
            nameOnBallot: updatedResponse.name_on_ballot
          },
          {
            electionDate: new Date(updatedResponse.election_dt),
            $addToSet: { counties: updatedResponse.county_name },
            contestName: updatedResponse.contest_name,
            nameOnBallot: updatedResponse.name_on_ballot,
            candidacyDate: updatedResponse.candidacy_dt,
            voteFor: updatedResponse.vote_for,
            term: updatedResponse.term,
            category: updatedResponse.category,
            level: updatedResponse.level,
            judicial: updatedResponse.judicial,
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
      }
    }
  }
  res.status(200).json({
    message: 'CSV successfully uploaded',
    newCandidates: newCandidates,
    candidates: candidates,
    uncategorizedRaces: uncategorizedRaces
  })
}

module.exports.getCandidatesToReview = async (req, res, next) => {
  try {
    candidatesToReview = await Candidate.find({ approved: false, response: { $exists: true } });
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

module.exports.getCandidatesByCounty = async (req, res, next) => {
  try {
    const candidates = await Candidate.find( { counties: req.params.county.toUpperCase() });
    res.status(200).json({
      candidates: candidates
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports.putUpdateCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.body._id, req.body);
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
    res.status(200).json({ message: "Candidate succesfully deleted" });
  } catch (err) {
    res.status(500).json({ message: "Unablle to delete candidate" })
    console.log(err);
  }

}
