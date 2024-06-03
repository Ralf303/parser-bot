import { Telegraf, session } from "telegraf";
import { CustomContext } from "./core/context";
import { IConfigService } from "./config/config.interface";
import { DatabaseService } from "./services/database/db.service";
import Database from "./services/database/db.class";
import Command from "./modules/commands/commands.class";
import { Commands } from "./modules/commands/main.commands";
import Action from "./modules/actions/actions.class";
import { MainActions } from "./modules/actions/main.actions";
import Handler from "./modules/handlers/handlers.class";
import { TextHandler } from "./modules/handlers/text.handler";

export default class Bot {
  private commands: Command[] = [];
  private actions: Action[] = [];
  private handlers: Handler[] = [];
  private bot: Telegraf<CustomContext>;

  protected db: Database;

  constructor(private configService: IConfigService) {
    this.bot = new Telegraf<CustomContext>(configService.get("TOKEN"));
    this.db = new DatabaseService();
  }

  public async start() {
    this.commands = [new Commands(this.bot, this.db)];
    this.actions = [new MainActions(this.bot, this.db)];
    this.handlers = [new TextHandler(this.bot, this.db)];
    await this.db.connect();
    this.bot.use(session());
    this.bot.catch((error) => console.log(error));
    this.actions.forEach((action) => action.handler());
    this.commands.forEach((command) => command.handler());
    this.handlers.forEach((handler) => handler.handler());
    this.bot.launch({ dropPendingUpdates: true });
    console.log("Bot started");
  }
}
