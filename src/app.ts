import Bot from "./bot";
import configService from "./config/config.service";

async function start() {
  const main = new Bot(new configService());
  await main.start();
}

start();
