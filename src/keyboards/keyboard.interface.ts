import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";

export interface IKeyboard {
  start(): InlineKeyboardMarkup;
  choose(): InlineKeyboardMarkup;
}
