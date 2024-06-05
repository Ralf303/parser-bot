import { Telegraf } from "telegraf";
import Command from "./commands.class";
import ru from "../../localization/ru.json";
import { CustomContext } from "../../core/context";
import Database from "../../services/database/db.class";

export class Commands extends Command {
  constructor(bot: Telegraf<CustomContext>, db: Database) {
    super(bot, db);
  }

  handler(): void {
    this.bot.start(async (ctx) => {
      try {
        const { id } = ctx.from;
        await this.db.getUser(String(id));
        await ctx.reply(ru.commands.start, {
          reply_markup: this.keyboardService.start(),
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
}
