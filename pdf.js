'use strict';

const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  try{
   await page.goto('https://scrapingbee.com/blog/block-requests-puppeteer/');
   await page.emulateMediaType('screen');
   await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
   });
  }catch(err){
    console.log(`Error:${err.message}`);
  }finally{
    await browser.close();
  }
})();

