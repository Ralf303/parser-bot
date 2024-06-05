function validateInstagramLink(l: string): string | boolean {
  const link: string = l.toLowerCase();
  if (link.indexOf("@") === 0) {
    return link.slice(1);
  }
  if (link.indexOf("instagram.com/") === -1) {
    return false;
  }
  const parts = link.split(".com/")[1].split(/[/?]/);
  const username = parts[0];

  return username;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export { validateInstagramLink, sleep, getRandomInt };
