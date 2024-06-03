import { Keyboard } from "telegram-keyboard";
import { IKeyboard } from "./keyboard.interface";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";
import ru from "../localization/ru.json";

export default class KeyboardService implements IKeyboard {
  start(): InlineKeyboardMarkup {
    const keyboard = Keyboard.inline([
      [ru.buttons.start.search],
      [ru.buttons.start.info],
    ]);

    return keyboard.reply_markup;
  }

  choose(): InlineKeyboardMarkup {
    const keyboard = Keyboard.inline([[ru.buttons.choose]]);

    return keyboard.reply_markup;
  }
}
