const csv = require('csvtojson');
const { response } = require('express');
const Candidate = require('../models/candidate');

module.exports.getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find();
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
      
      //use findAndUpdate to update candidates and add to correct array
      // var candidate = ({
      //   electionDate: new Date(response.election_dt),
      //   // countyName: response.county_name,
      //   contestName: response.contest_name,
      //   nameOnBallot: response.name_on_ballot,
      //   candidacyDate: response.candidacy_dt,
      //   voteFor: response.vote_for,
      //   term: response.term
      // });
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
            term: response.term
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
