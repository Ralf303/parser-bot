import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import ru from "../../localization/ru.json";
import { CustomContext } from "../../core/context";
import Database from "../../services/database/db.class";
import Handler from "./handlers.class";
import { getRandomInt, validateInstagramLink } from "../../utils/helpers";

export class TextHandler extends Handler {
  constructor(bot: Telegraf<CustomContext>, db: Database) {
    super(bot, db);
  }

  handler(): void {
    this.bot.on(message("text"), async (ctx) => {
      try {
        const { id } = ctx.from;
        await this.db.getUser(String(id));
        const text = ctx.message.text;
        const res: string | boolean = validateInstagramLink(text);

        if (!res) {
          await ctx.react("👎");
          return ctx.reply(ru.main.error);
        }

        await ctx.react("👀");
        await ctx.reply(ru.main.wait);
        const message = await ctx.reply(ru.main.search.m1);
        //@ts-ignore
        const buffer = await this.parser.getPhoto(res, message.message_id, ctx);
        await ctx.replyWithMediaGroup([
          {
            media: { source: buffer[0] },
            type: "photo",
            caption: `Слив знайдений ✅\n\n\n🆔 ID: 66278979\n🌐 Посилання: https://instagram.com/${res}\n\n📄 Зібрані вкладення:\n\n📷 Інтим фото: ${getRandomInt(
              2,
              40
            )}\n📹 Інтим відео: ${getRandomInt(
              0,
              5
            )}\n📆 Дата зливу: ${getRandomInt(10, 28)}.${getRandomInt(
              10,
              12
            )}.${getRandomInt(2020, 2023)}`,
          },
          {
            media: { source: buffer[1] },
            type: "photo",
          },
        ]);
        await ctx.reply(ru.main.pay, {
          reply_markup: this.keyboardService.pay(),
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
}
