'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  const urls = [
    'https://scrapingbee.com',
    'https://medium.com',
    'https://www.google.com'
    // Add more URLs here
  ];

  const screenshots = [];

  try {
    for (const url of urls) {
      await page.goto(url);
      const screenshotPath = `./${url.replace(/[:\/.]/g, '_')}.jpg`; 
      await page.screenshot({ path: screenshotPath });
      screenshots.push({ url, screenshotPath });
      //console.log(screenshots)
      console.log(`Screenshot captured for ${url}`);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`Screenshots have been captured successfully`);
  }
})();
