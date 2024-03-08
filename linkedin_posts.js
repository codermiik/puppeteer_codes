const puppeteer = require('puppeteer');

async function fetchConnectionInvitations() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/login');

  await page.type('#username', 'williamsumba2019@gmail.com'); // Replace with your LinkedIn username
  await page.type('#password', 'Sumba1462'); // Replace with your LinkedIn password

  await Promise.all([
    page.waitForNavigation(),
    page.click('.login__form_action_container button'),
  ]);

  console.log('Connection Invitations:', invitationDetails);

  await browser.close();
}

// Execute the function initially
fetchConnectionInvitations().catch(console.error);

// Schedule the function to run every 2 minutes
const intervalInMilliseconds = 2 * 60 * 1000; // 2 minutes
setInterval(async () => {
  try {
    await fetchConnectionInvitations();
  } catch (error) {
    console.error('Error in scheduled execution:', error);
  }
}, intervalInMilliseconds);


/////////////////////////////////this file is still undergoing updates.This codes are incomplete