function validateInstagramLink(l: string): string | boolean {
  const link: string = l.toLowerCase();
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
export { validateInstagramLink, sleep };
