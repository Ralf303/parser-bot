import { User } from "../../core/user";

export default abstract class Database {
  constructor() {}

  abstract connect(): Promise<void>;
  abstract getUser(chatId: string): Promise<User>;
  abstract isAdmin(chatId: string): Promise<boolean>;
  abstract makeAdmin(id: string): Promise<boolean>;
  abstract getUsers(): Promise<User[]>;
}
