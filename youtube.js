const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
    });

    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for the search input field to be visible and then type 'node.js'
    await page.waitForSelector('input#search', { visible: true });
    await page.type('input#search', 'node.js', { delay: 100 });

    // Click the search button
    await page.click('button#search-icon-legacy');

    // Wait for search results to load
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

    // Extract titles and links of search results
    const data = await page.evaluate(() => {
      const titles = document.querySelectorAll('a#video-title');
      const data = [];
      titles.forEach(title => {
        data.push({
          title: title.textContent.trim(),
          link: title.href
        });
      });
      return data;
    });

    console.log(data);

  } catch (error) {
    console.error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();