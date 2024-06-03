import { Telegraf } from "telegraf";
import KeyboardService from "../../keyboards/keyboard.service";

import { CustomContext } from "../../core/context";
import Database from "../../services/database/db.class";

export default abstract class Command {
  protected keyboardService: KeyboardService;

  constructor(public bot: Telegraf<CustomContext>, public db: Database) {
    this.keyboardService = new KeyboardService();
  }
  abstract handler(): void;
}
