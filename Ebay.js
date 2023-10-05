'use strict';

const puppeteer = require('puppeteer');
const mysql = require('mysql2/promise'); // Import the mysql2 library

// Function to perform the scraping and insertion into the database
const scrapeAndInsertData = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Define search queries for Nike, Adidas, Puma, and Reebok shoes
  const queries = ['nike shoes', 'adidas shoes', 'puma shoes', 'reebok shoes'];
  const results = {};

  // MySQL database configuration
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ebay_shoes',
  };

  const connection = await mysql.createConnection(dbConfig);

  for (const query of queries) {
    const url = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${encodeURIComponent(query)}&_sacat=0`;

    await page.goto(url);

    const shoes = await page.evaluate(() => {
      const items = document.querySelectorAll('.s-item');
      const results = [];

      items.forEach((item) => {
        const name = item.querySelector('.s-item__title')?.innerText.trim();
        const price = item.querySelector('.s-item__price')?.innerText.trim();
        const shipping = item.querySelector('.s-item__shipping')?.innerText.trim();

        if (name && price && shipping) {
          results.push({ name, price, shipping });
        }
      });

      return results;
    });

    // Determine the table name based on the query
    let tableName;
    switch (query) {
      case 'nike shoes':
        tableName = 'nike';
        break;
      case 'adidas shoes':
        tableName = 'adidas';
        break;
      case 'puma shoes':
        tableName = 'puma';
        break;
      case 'reebok shoes':
        tableName = 'reebok';
        break;
      default:
        tableName = 'other';
    }

    // Check if each shoe already exists in the table
    if (shoes.length > 0) {
      for (const shoe of shoes) {
        const [existingShoe] = await connection.query(`SELECT * FROM ${tableName} WHERE name = ?`, [shoe.name]);

        // Insert the shoe only if it doesn't already exist in the table
        if (existingShoe.length === 0) {
          const insertQuery = `INSERT INTO ${tableName} (name, price, shipping) VALUES (?, ?, ?)`;
          await connection.query(insertQuery, [shoe.name, shoe.price, shoe.shipping]);
          console.log(`Inserted '${shoe.name}' into ${tableName} table.`);
        }
      }
    }
  }

  await browser.close();
  await connection.end();

  console.log('Data scraping and insertion into MySQL completed.Dzaaaaaaaam! william you is a genius');
};

// Set an initial run of the scraper
scrapeAndInsertData();

// Schedule the scraper to run every 10 seconds (in milliseconds)
const interval = 10 *1000; // 
setInterval(scrapeAndInsertData, interval);
