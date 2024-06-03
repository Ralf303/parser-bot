import puppeteer from "puppeteer";
import Parser from "./parser.class";
import fs from "fs";
import { sleep } from "../../utils/helpers";

export class ParserService extends Parser {
  private url: string = "https://instagram.com/";

  constructor() {
    super();
  }

  async getPhoto(nick: string): Promise<any> {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    console.log("страница создана");
    await page.goto(`${this.url}${nick}`);
    console.log("страница уходит на рендер");
    await sleep(10000);
    console.log("страница щас будет скрин");
    await page.screenshot({ path: "example.png" });
    console.log("страница скрин");
    // await page.waitForSelector('img[alt="Фото профиля ${nick}"]');
    // const elements = await page.$$eval(
    //   `img[alt="Фото профиля ${nick}"]`,
    //   //@ts-ignore
    //   (imgs) => imgs.map((img) => img.src)
    // );

    // elements.forEach(async (imgSrc, index) => {
    //   const viewSource = await page.goto(imgSrc);
    //   console.log("фотка");

    //   //@ts-ignore
    //   fs.writeFileSync(`image${index}.png`, await viewSource.buffer());
    // });

    // console.log('Изображения с alt="AltText":', elements);

    await browser.close();
  }
}
