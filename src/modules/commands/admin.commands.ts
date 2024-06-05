import { Telegraf } from "telegraf";
import Command from "./commands.class";
import { CustomContext } from "../../core/context";
import Database from "../../services/database/db.class";

export class AdminCommands extends Command {
  constructor(bot: Telegraf<CustomContext>, db: Database) {
    super(bot, db);
  }

  handler(): void {
    this.bot.command("new", async (ctx) => {
      try {
        const { id } = ctx.from;
        const status: boolean = await this.db.isAdmin(String(id));

        if (!status) {
          return await ctx.reply("Ты не админ");
        }

        await ctx.scene.enter("spamScene");
      } catch (error) {
        console.log(error);
      }
    });

    this.bot.command("add", async (ctx) => {
      try {
        const { id } = ctx.from;
        const status: boolean = await this.db.isAdmin(String(id));

        if (!status) {
          await ctx.reply("Ты не админ");
          return;
        }

        const adminId: string = ctx?.payload;

        if (adminId) {
          const result = await this.db.makeAdmin(adminId);

          if (result) {
            return await ctx.reply("Админ успешно добавлен");
          }

          return await ctx.reply("Такого юзера не существует");
        }

        await ctx.reply("Ты не ввел айди");
      } catch (error) {
        console.log("err in add", error);
      }
    });
  }
}
