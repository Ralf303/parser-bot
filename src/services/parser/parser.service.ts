import puppeteer from "puppeteer";
import Parser from "./parser.class";
import fs from "fs";
import { sleep } from "../../utils/helpers";
import Jimp from "jimp";
import { CustomContext } from "../../core/context";
import ru from "../../localization/ru.json";

export class ParserService extends Parser {
  private url: string = "https://instagram.com/";

  constructor(instaLogin: string, instaPassword: string) {
    super(instaLogin, instaPassword);
  }

  private async blendPhoto(nick: string, bgn: string) {
    const bg = await Jimp.read(`res/bg${bgn}.jpg`);

    let fg = await Jimp.read("temp.jpg");
    const y = 48;
    const x = 91;
    fg = fg.resize(70, 70);

    // Делаем изображение круглым
    const mask = new Jimp(fg.bitmap.width, fg.bitmap.height, 0x00000000);
    const diameter = Math.min(fg.bitmap.width, fg.bitmap.height);
    const radius = diameter / 2;
    const center = [fg.bitmap.width / 2, fg.bitmap.height / 2];
    for (let x = 0; x < diameter; x++) {
      for (let y = 0; y < diameter; y++) {
        const distance = Math.sqrt(
          Math.pow(center[0] - x, 2) + Math.pow(center[1] - y, 2)
        );
        if (distance < radius) {
          mask.setPixelColor(0xffffffff, x, y);
        }
      }
    }

    // Применяем маску к изображению
    fg.mask(mask, 0, 0);

    // Добавляем текст
    const font = await Jimp.loadFont("font/KjH7c0dAzjagpFbWD2T2ma5k.ttf.fnt");
    bg.print(
      font,
      170,
      50,
      {
        text: nick,
      },
      bg.bitmap.width,
      bg.bitmap.height
    );

    bg.composite(fg, x, y);
    const buffer = await bg.getBufferAsync(Jimp.MIME_JPEG);
    return buffer;
  }

  async getPhoto(
    nick: string,
    messageId: number,
    ctx: CustomContext
  ): Promise<any> {
    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      await page.goto(`${this.url}`);
      //@ts-ignore
      await ctx.telegram.editMessageText(
        ctx.from?.id,
        messageId,
        ru.main.search.m2,
        ru.main.search.m2
      );
      await page.waitForSelector(
        'input[aria-label="Phone number, username, or email"]'
      );
      await page.type(
        'input[aria-label="Phone number, username, or email"]',
        this.instaLogin
      );
      await page.type('input[aria-label="Password"]', this.instaPassword);
      await page.locator("button[type='submit']").click();
      await sleep(3000);
      //@ts-ignore
      await ctx.telegram.editMessageText(
        ctx.from?.id,
        messageId,
        ru.main.search.m3,
        ru.main.search.m3
      );
      await page.goto(`${this.url}${nick}`);
      await page.waitForSelector(`img[alt="${nick}'s profile picture"]`);

      const imgElement = await page.waitForSelector(
        `img[alt="${nick}'s profile picture"]`
      );
      const imgUrl = await page.evaluate(
        //@ts-ignore
        (img) => img.getAttribute("src"),
        imgElement
      );

      const axios = require("axios");
      const response: any = await axios({
        url: imgUrl,
        method: "GET",
        responseType: "stream",
      });

      const writer = fs.createWriteStream("temp.jpg");

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      //@ts-ignore
      await ctx.telegram.editMessageText(
        ctx.from?.id,
        messageId,
        ru.main.search.m4,
        ru.main.search.m4
      );
      const photo1 = await this.blendPhoto(nick, "1");
      //@ts-ignore
      await ctx.telegram.editMessageText(
        ctx.from?.id,
        messageId,
        ru.main.search.m5,
        ru.main.search.m5
      );
      const photo2 = await this.blendPhoto(nick, "2");
      //@ts-ignore
      await ctx.telegram.editMessageText(
        ctx.from?.id,
        messageId,
        ru.main.search.m6,
        ru.main.search.m6
      );
      // await browser.close();
      return [photo1, photo2];
    } catch (error) {
      await ctx.telegram.editMessageText(
        ctx.from?.id,
        messageId,
        "Яка то помилка, спробуй пізніше",
        "Яка то помилка, спробуй пізніше"
      );
      console.log(error);
    }
  }
}
