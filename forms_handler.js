'use strict';

const puppeteer = require('puppeteer');

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://github.com/login');

  await page.type('#login_field', '#####');
  await page.type('#password', '###');

  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"]'),
  ]);

  await page.waitForSelector('.avatar-user');


  await page.goto('https://github.com/codermiik?tab=repositories');


  await page.waitForSelector('.source');


  const repositoryNames = await page.evaluate(() => {
    const repoNodes = document.querySelectorAll('.source');
    const repos = [];
    for (const node of repoNodes) {
      const name = node.querySelector('.wb-break-all').innerText;
      repos.push(name);
    }
    return repos;
  });

  console.log('User repositories:', repositoryNames);

  await browser.close();
}

// Execute the main function first before executing the timer 
main().catch(console.error);

// Schedule the main function to run every 2 minutes
const intervalInMilliseconds = 0.5* 60 * 1000; 
setInterval(async () => {
  try {
    await main();
  } catch (error) {
    console.error('Error in scheduled execution:', error);
  }
}, intervalInMilliseconds);

