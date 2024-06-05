import { Telegraf } from "telegraf";
import ru from "../../localization/ru.json";
import { CustomContext } from "../../core/context";
import Action from "./actions.class";
import Database from "../../services/database/db.class";

export class PayActions extends Action {
  constructor(bot: Telegraf<CustomContext>, db: Database) {
    super(bot, db);
  }

  handler(): void {
    this.bot.action(ru.buttons.pay.ones, async (ctx) => {
      try {
        await ctx.deleteMessage();
        await ctx.replyWithHTML(ru.main.card199, {
          reply_markup: this.keyboardService.sucsess(),
        });
      } catch (error) {
        console.log(error);
      }
    });

    this.bot.action(ru.buttons.pay.always, async (ctx) => {
      try {
        await ctx.deleteMessage();
        await ctx.replyWithHTML(ru.main.card399, {
          reply_markup: this.keyboardService.sucsess(),
        });
      } catch (error) {
        console.log(error);
      }
    });

    this.bot.action(ru.buttons.sucsess, async (ctx) => {
      try {
        await ctx.reply(ru.main.scam);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
