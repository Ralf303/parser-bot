import { Telegraf } from "telegraf";
import ru from "../../localization/ru.json";
import { CustomContext } from "../../core/context";
import Action from "./actions.class";
import Database from "../../services/database/db.class";

export class MainActions extends Action {
  constructor(bot: Telegraf<CustomContext>, db: Database) {
    super(bot, db);
  }

  handler(): void {
    this.bot.action(ru.buttons.start.info, async (ctx) => {
      try {
        await ctx.deleteMessage();
        await ctx.reply(ru.actions.info);
        await ctx.reply(ru.main.choose, {
          reply_markup: this.keyboardService.choose(),
        });
      } catch (error) {
        console.log(error);
      }
    });

    this.bot.action(ru.buttons.start.search, async (ctx) => {
      try {
        await ctx.deleteMessage();
        await ctx.reply(ru.main.choose, {
          reply_markup: this.keyboardService.choose(),
        });
      } catch (error) {
        console.log(error);
      }
    });

    this.bot.action(ru.buttons.choose, async (ctx) => {
      try {
        await ctx.deleteMessage();
        await ctx.reply(ru.main.example);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
