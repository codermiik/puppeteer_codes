'use strict';

const puppeteer = require('puppeteer');
const mysql = require('mysql2/promise');

async function scrapeQuotes() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'quotes',
    };
    const connection = await mysql.createConnection(dbConfig);

    try {
        await page.goto('https://quotes.toscrape.com/', { waitUntil: "domcontentloaded" });

        let hasNextPage = true;
        const quotesData = [];

        while (hasNextPage) {
            await scrollPage(page);

            const data = await page.evaluate(() => {
                const items = document.querySelectorAll('.quote');
                const data = [];

                items.forEach((item) => {
                    const quote = item.querySelector('.text')?.innerText.trim();
                    const author = item.querySelector('.author')?.innerText.trim();
                    if (quote && author) {
                        data.push({ quote, author });
                    }
                });

                return data;
            });

            quotesData.push(...data);

            // Check if there is a next page button
            const nextPageButton = await page.$('.pager > .next > a');
            hasNextPage = nextPageButton !== null;

            // If there is a next page button, click it
            if (hasNextPage) {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 0 }),
                    page.click(".pager > .next > a")
                ]);
            }
        }

        // Insert quotes data into the database
        await Promise.all(quotesData.map(async (quote) => {
            await connection.execute('INSERT INTO quote (text, author) VALUES (?, ?)', [quote.quote, quote.author]);
        }));

        return quotesData;
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.close();
        await connection.end(); // Close the database connection
    }
}

async function scrollPage(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 100;
            const scrollInterval = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(scrollInterval);
                    resolve();
                }
            }, 100);
        });
    });
}

// Call the function and log the result
scrapeQuotes()