export class Candidate {
  constructor(
    public electionDate: Date,
    public countyName: String,
    public contestName: String,
    public nameOnBallot: String,
    public candidacyDate: Date,
    public voteFor: Number,
    public term: Number
  ) {

  }
}