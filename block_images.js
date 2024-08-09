'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try{
   await page.setRequestInterception(true);
   page.on('request', request => {
   const resourceType = request.resourceType();
    if (resourceType === 'image' || resourceType === 'webscocket' ) {
      request.abort();
    } else {
      request.continue();
    }
    });
  const url = 'https://www.jumia.co.ke/';
  await page.goto(url);
 // await page.waitForTimeout(10000); 
  const screenshotPath = `./${url.replace(/[:\/.]/g, '_')}.jpg`
  await page.screenshot({ path: screenshotPath, fullPage: true });
  }catch(err){
    console.log(`Error: ${err.message}`);
  }finally{
    await browser.close();
  }

})();



//RESOURCES THAT CAN BE BLOCKED INCLUDE
//Stylesheets: CSS files used for styling web pages.
//Scripts: JavaScript files used for dynamic functionality.
//Fonts: Font files such as .woff, .woff2, etc., used for text rendering.
//XHR (XMLHttpRequest) or Fetch requests: AJAX requests made by JavaScript for data retrieval.
//Media: Audio and video files.
//Frames: Embedded frames or iframes.
//Manifests: Web app manifests.
//WebSockets: WebSocket connections established by the page.
