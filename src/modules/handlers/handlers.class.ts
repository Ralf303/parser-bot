import { Telegraf } from "telegraf";
import KeyboardService from "../../keyboards/keyboard.service";

import { CustomContext } from "../../core/context";
import Database from "../../services/database/db.class";
import Parser from "../../services/parser/parser.class";
import { ParserService } from "../../services/parser/parser.service";
import { IConfigService } from "../../config/config.interface";
import configService from "../../config/config.service";

export default abstract class Handler {
  protected keyboardService: KeyboardService;
  protected parser: Parser;
  private configService: IConfigService;

  constructor(public bot: Telegraf<CustomContext>, public db: Database) {
    this.keyboardService = new KeyboardService();
    this.configService = new configService();
    this.parser = new ParserService(
      this.configService.get("instLogin"),
      this.configService.get("instPassword")
    );
  }
  abstract handler(): void;
}
