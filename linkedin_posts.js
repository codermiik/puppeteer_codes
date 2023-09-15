const puppeteer = require('puppeteer');

async function fetchConnectionInvitations() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/login');

  await page.type('#username', 'williamsumba@gmailcom'); // Replace with your LinkedIn username
  await page.type('#password', 'Sumba1462'); // Replace with your LinkedIn password

  await Promise.all([
    page.waitForNavigation(),
    page.click('.login__form_action_container button'),
  ]);

  // Wait for the user's profile page to load
  await page.waitForSelector('.global-nav__me-photo');

  // Navigate to the My Network page
  await page.goto('https://www.linkedin.com/mynetwork/invitation-manager/');

  // Wait for the connection invitations to load
  await page.waitForSelector('.mn-invitation-list');

  // Extract connection invitation details
  const invitationDetails = await page.evaluate(() => {
    const invitationNodes = document.querySelectorAll('.mn-invitation-list li');
    const invitations = [];
    for (const node of invitationNodes) {
      const sender = node.querySelector('.invitation-card__sender-name').innerText;
      const message = node.querySelector('.invitation-card__message').innerText;
      invitations.push({ sender, message });
    }
    return invitations;
  });

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
