import { County } from '../county/county.model';

export class Candidate {
  constructor(
    public _id: String,
    public electionDate: Date,
    public counties: County[],
    public contestName: String,
    public nameOnBallot: String,
    public candidacyDate: Date,
    public voteFor: Number,
    public term: Number,
    public approved: Boolean,
    public response: Array<{ question: string, answer: string, tag: string, order: number, textarea: boolean }>
  ) {

  }
}