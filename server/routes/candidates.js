//imports
const express = require('express');
const multer = require('multer');
const csv = require('csvtojson');

const Candidate = require('../models/candidate');

const router = express.Router();

const upload = multer({ dest: './server/public/uploads/temp/csv' });

router.get('/', async (req, res, next) => {
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
});

router.post('/', upload.single("candidateCSV"), async function (req, res) {
  //turn csv into json 
  const responseData = await csv().fromFile(req.file.path);
  const counties = req.body.counties;
  const trackPrimary = req.body.trackPrimary.toUpperCase();

  //arrays to store candidates
  const candidates = [];
  const newCandidates = [];

  //loop through json data to create array of candidates 
  for (let response of responseData) {

    //filter for desired counties
    if (counties.includes(response.county_name) && trackPrimary === response.has_primary) {

      //use findAndUpdate to update candidates and add to correct array
      var candidate = ({
        electionDate: new Date(response.election_dt),
        countyName: response.county_name,
        contestName: response.contest_name,
        nameOnBallot: response.name_on_ballot,
        candidacyDate: response.candidacy_dt,
        voteFor: response.vote_for,
        term: response.term
      });
      try {
        const response = await Candidate.findOneAndUpdate(
          {
            electionDate: candidate.electionDate,
            countyName: candidate.countyName,
            contestName: candidate.contestName,
            nameOnBallot: candidate.nameOnBallot
          },
          candidate,
          { upsert: true, rawResult: true }
        );
        if (!response.lastErrorObject.updatedExisting) {
          newCandidates.push(candidate);
          candidates.push(candidate);
        } else {
          candidates.push(candidate);
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
});

module.exports = router;