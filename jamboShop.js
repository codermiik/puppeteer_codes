'use strict';

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

async function scrapeJamboshop() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const searchQuery = 'Nike shoes'; 
  const url = `https://www.jamboshop.com/search?k=${encodeURIComponent(searchQuery)}`;

  await page.goto(url);

  const shoes = await page.evaluate(() => {
    const items = document.querySelectorAll('.productDetailsBox');
    const results = [];

    items.forEach((item) => {
      const name = item.querySelector('.prd-title')?.innerText.trim();
      const price_before_offer = item.querySelector('.mrp-price')?.innerText.trim();
      const price_after_offer = item.querySelector('.offer-price')?.innerText.trim();

      if (name && price_before_offer && price_after_offer) {
        results.push({ name, price_before_offer, price_after_offer });
      }
    });

    return results;
  });

  await browser.close();

  return shoes;
}

app.get('/', async (req, res) => {
  try {
    const shoes = await scrapeJamboshop();
    res.render('index', { shoes });
  } catch (error) {
    console.error('Error occurred:', error);
    res.send('An error occurred while scraping data.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});








