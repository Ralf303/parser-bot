import { Telegraf } from "telegraf";
import KeyboardService from "../../keyboards/keyboard.service";

import { CustomContext } from "../../core/context";
import Database from "../../services/database/db.class";
import Parser from "../../services/parser/parser.class";
import { ParserService } from "../../services/parser/parser.service";

export default abstract class Handler {
  protected keyboardService: KeyboardService;
  protected parser: Parser;

  constructor(public bot: Telegraf<CustomContext>, public db: Database) {
    this.keyboardService = new KeyboardService();
    this.parser = new ParserService();
  }
  abstract handler(): void;
}
