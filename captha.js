const puppeteer = require("puppeteer-extra");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
(async function () {
  // That's it, the rest is puppeteer usage as normal 
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  let navigationPromise = page.waitForNavigation();

  await page.goto("https://accounts.google.com/");
  await navigationPromise;
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="carolynegichuki0@gmail.com"]', process.env.email); // Email login
  await page.click("#identifierNext");

  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="walai001"]', process.env.password); // Password login

  await page.waitForSelector("#passwordNext", { visible: true });
  await page.click("#passwordNext");
  navigationPromise = page.waitForNavigation();
  await navigationPromise;
  await page.goto(process.env.file_url); // Spreadsheet url

  await page.screenshot({ path: "spreadsheet-screen.png", fullPage: true }); // We take a screenshot to have probe of the bypass
  await browser.close();
})();