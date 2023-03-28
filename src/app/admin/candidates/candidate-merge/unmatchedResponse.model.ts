export class UnmatchedResponse {
  constructor(
    public _id: String,
    public nameOnBallot: String,
    public response: Array<{ question: string, answer: string, tag: string, order: number, textarea: boolean }>
  ) {

  }
}