const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/');


  await page.waitForSelector('input#search');
  await page.type('input#search', 'node.js', { delay: 100 });

  await page.click('button#search-icon-legacy');

  await page.waitForNavigation({ waitUntil: 'networkidle2' });


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

 
  await browser.close();
})();
