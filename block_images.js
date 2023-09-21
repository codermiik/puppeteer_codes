'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image') {
      request.abort();
    } else {
      request.continue();
    }
  });
  await page.goto('https://news.google.com/news/');
  await page.screenshot({path: 'news.png', fullPage: true});

  await browser.close();
})();