export class Notification {
  constructor(
    public message: string,
    public redirect: boolean,
    public path?: string
  ) {

  }
}