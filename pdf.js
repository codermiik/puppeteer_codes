'use strict';
const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.educba.com/scraper-javascript/');

  
  await page.waitForSelector('body');
  const pdfPath = 'educba.pdf';
   await page.pdf({ path: pdfPath, format: 'A4' });
   await browser.close();

  console.log(`PDF saved to ${pdfPath}`);
})();

/*
'use strict';
const puppeteer = require('puppeteer');
const RobotsParser = require('robots-parser');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const websiteURL = 'https://www.educba.com/scraper-javascript/';
  const robotsTxtURL = `${websiteURL}robots.txt`; // Construct the robots.txt URL

  // Fetch and parse the robots.txt file
  const robotsTxt = await page.goto(robotsTxtURL, { waitUntil: 'networkidle0' });
  const robotsTxtContent = await robotsTxt.text();
  const robotsParser = RobotsParser(robotsTxtURL, robotsTxtContent);

  // Check if scraping is allowed
  const isScrapingAllowed = robotsParser.isAllowed('your-user-agent-name', websiteURL);

  if (!isScrapingAllowed) {
    console.log('Scraping is not allowed by robots.txt. Aborting.');
    await browser.close();
    return;
  }

  await page.goto(websiteURL);
  await page.waitForSelector('body');
  const pdfPath = 'educba.pdf';
  await page.pdf({ path: pdfPath, format: 'A4' });
  await browser.close();

  console.log(`PDF saved to ${pdfPath}`);
})();*/
