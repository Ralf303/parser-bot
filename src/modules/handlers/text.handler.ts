import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import ru from "../../localization/ru.json";
import { CustomContext } from "../../core/context";
import Database from "../../services/database/db.class";
import Handler from "./handlers.class";
import { validateInstagramLink } from "../../utils/helpers";

export class TextHandler extends Handler {
  constructor(bot: Telegraf<CustomContext>, db: Database) {
    super(bot, db);
  }

  handler(): void {
    this.bot.on(message("text"), async (ctx) => {
      try {
        const { id } = ctx.from;
        const user = await this.db.getUser(String(id));
        const text = ctx.message.text;
        const res: string | boolean = validateInstagramLink(text);

        if (!res) {
          await ctx.react("👎");
          return ctx.reply(ru.main.error);
        }

        await ctx.react("👀");
        //@ts-ignore
        await this.parser.getPhoto(res);
        //@ts-ignore
        await ctx.reply(res);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
