const puppeteer = require('puppeteer');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

 // const searchQuery = 'Nike shoes'; // Change this to your desired search query
  //const url = `https://www.ebay.com/=${encodeURIComponent(searchQuery)}`;
  const url = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=nike+shoes&_sacat=0`

  await page.goto(url);

  const shoes = await page.evaluate(() => {
    const items = document.querySelectorAll('.s-item');
    const results = [];

    items.forEach((item) => {
      const name = item.querySelector('.s-item__title')?.innerText.trim();
      const price = item.querySelector('.s-item__price')?.innerText.trim();
      const plus_shipping = item.querySelector('.s-item__shipping')?.innerText.trim();

      if (name && price && plus_shipping) {
        results.push({ name, price, plus_shipping });
      }
    });

    return results;
  });

  await browser.close();

  console.log('Nike Shoes on eBay:');
  console.log(shoes);

})();
