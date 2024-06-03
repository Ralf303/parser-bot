export default abstract class Parser {
  constructor() {}

  abstract getPhoto(nick: string): Promise<any>;
}
