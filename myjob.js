'use strict';

const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

async function scrapeJobs() {
    const browser = await puppeteer.launch({ headless: false , waitUntil:"networkidle2" });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.myjobmag.co.ke/', { waitUntil: "domcontentloaded"});

        let hasNextPage = true;
        const jobsData = [];

        while (hasNextPage) {
            await scrollPage(page); //This function has been defined elsewhere in this code

            const data = await page.evaluate(() => {
                const items = document.querySelectorAll('.job-list-li');
                const data = [];

                items.forEach((item) => {
                    const title = item.querySelector('h2 a')?.innerText.trim();
                    const url = item.querySelector('h2 a')?.getAttribute('href').trim();
                    const description = item.querySelector('.job-desc')?.innerText.trim();

                    if (title && url && description) { 
                        data.push({ title, url, description});
                    }
                });

                return data;
            });

            jobsData.push(...data);

            // Check if there is a next page button
            const nextPageButton = await page.$('.setPaginate > li:last-child > a');
            hasNextPage = nextPageButton !== null;

            // If there is a next page button, click it
            if (hasNextPage) {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 0 }),
                    page.click(".setPaginate > li:last-child > a")
                ]);
            }
        }

        return jobsDataData;

    } catch (error) {
        console.error(`Error:${error.message}`);
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

                // Check if the next page link is visible 
                const nextPageLink = document.querySelector('.setPaginate > li:last-child > a');
                if (nextPageLink && nextPageLink.getBoundingClientRect().top <= window.innerHeight) { 
                    clearInterval(scrollInterval);
                    resolve();
                }

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
        const jobs = await scrapeJobs();
        res.render('jobs', { jobs });
    } catch (error) {
        console.error(`Error:${error.message}`);
        res.send('An error occurred while extracting jobs.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
