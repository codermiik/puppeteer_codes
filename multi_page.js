'use strict';

 //This code generates a site based on the data scrapped
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

async function scrapeQuotes() {
    const browser = await puppeteer.launch({ headless: false , waitUntil:"networkidle2" });
    const page = await browser.newPage();

    try {
        await page.goto('https://quotes.toscrape.com/', { waitUntil: "domcontentloaded"});

        let hasNextPage = true;
        const quotesData = [];

        while (hasNextPage) {
            await scrollPage(page); //This function has been defined elsewhere in this code

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

        return quotesData;
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.close();
    }
}

//the scroll page function
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

app.get('/', async (req, res) => {
    try {
        const quotes = await scrapeQuotes();
        res.render('index', { quotes });
    } catch (error) {
        console.error('Error occurred:', error);
        res.send('An error occurred while scraping data.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
