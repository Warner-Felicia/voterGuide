import { County } from '../../county/county.model';

export class Candidate {
  constructor(
    public electionDate: Date,
    public counties: County[],
    public contestName: String,
    public nameOnBallot: String,
    public candidacyDate: Date,
    public voteFor: Number,
    public term: Number
  ) {

  }
}