import { CustomContext } from "../../core/context";

export default abstract class Parser {
  protected instaLogin: string;
  protected instaPassword: string;

  constructor(instaLogin: string, instaPassword: string) {
    this.instaLogin = instaLogin;
    this.instaPassword = instaPassword;
  }

  abstract getPhoto(
    nick: string,
    messageId: number,
    ctx: CustomContext
  ): Promise<any>;
}
