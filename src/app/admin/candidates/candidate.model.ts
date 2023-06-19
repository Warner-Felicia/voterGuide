import { County } from '../county/county.model';

export class Candidate {
  constructor(
    public _id: string,
    public electionDate: Date,
    public counties: County[],
    public contestName: string,
    public nameOnBallot: string,
    public candidacyDate: Date,
    public voteFor: Number,
    public term: Number,
    public approved: Boolean,
    public response: Array<{ question: string, answer: string, tag: string, order: number, textarea: boolean }>
  ) {

  }
}