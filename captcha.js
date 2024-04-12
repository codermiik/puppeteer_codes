const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');


puppeteerExtra.use(Stealth());


(async () => {
  const browserObj = await puppeteerExtra.launch({headless:false});
  const newpage = await browserObj.newPage();


 
  await newpage.setViewport({ width: 1280, height: 720 });


  await newpage.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');


  await newpage.goto('https://www.ticketmaster.com/');
  await newpage.waitForTimeout(20000); // Wait for 20 seconds


  await newpage.screenshot({ path: 'screenshot.png' });


  await browserObj.close();
})();