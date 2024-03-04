'use strict';
const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://scrapingbee.com/blog/block-requests-puppeteer/');

  
   await page.emulateMediaType('screen');
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });
  
   await browser.close();

})();

