import { Scenes } from "telegraf";
import { CustomContext } from "../../core/context";
import KeyboardService from "../../keyboards/keyboard.service";
import Database from "../../services/database/db.class";

export default abstract class Scene {
  protected keyboardService: KeyboardService;

  constructor(protected db: Database) {
    this.keyboardService = new KeyboardService();
  }
  abstract init(): Scenes.BaseScene<CustomContext>;
}
