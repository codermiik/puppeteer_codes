const puppeteer = require('puppeteer');

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://github.com/login');

  await page.type('#login_field', 'codermiik');
  await page.type('#password', 'Sumba1462');

  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"]'),
  ]);

  // Wait for the profile page to load
  await page.waitForSelector('.avatar-user');

  // Navigate to the user's repositories page
  await page.goto('https://github.com/codermiik?tab=repositories');

  // Wait for the repositories to load
  await page.waitForSelector('.source');

  // Extract repository names
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

main().catch(console.error);
