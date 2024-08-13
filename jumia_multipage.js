'use strict'

const puppeteer= require('puppeteer');

(async () => {
    const browser =await puppeteer.launch({headless:false})
    const page = await browser.newPage()

    const searchTerm = 'televisions'
    const url =`https://www.jumia.co.ke/catalog/?q=${encodeURIComponent(searchTerm)}`

    try{
        await page.goto(url,  { waitUntil: "domcontentloaded"});
        let hasNextPage =true;
        let output=[]

        while(hasNextPage){
            await scrollPage(page); //This function has been defined elsewhere in this code

            const data = await page.evaluate(() => {
                const tvs = document.querySelectorAll('article.prd._fb');
                const results = [];
          
                tvs.forEach((tv) => {
                  const name = tv.querySelector('.name')?.innerText.trim();
                  const initial_price = tv.querySelector('.old')?.innerText.trim();
                  const current_price = tv.querySelector('.prc')?.innerText.trim();
                  const percentage_discount = tv.querySelector('.bdg._dsct')?.innerText.trim();
          
                  if (name && initial_price && current_price && percentage_discount) {
                    results.push({ name, initial_price, current_price, percentage_discount });
                  }
                });
          
                return results;
            });

            output.push(...data);
            console.log(output);

            // Check if there is a next page button
           const nextPageButton = await page.$('a.pg[aria-label="Next Page"]');
            hasNextPage = nextPageButton !== null;


            // If there is a next page button, click it
            if (hasNextPage) {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 0 }),
                    page.click('a.pg[aria-label="Next Page"]')
                ]);
            }
        }
    }catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.close();
    }
    
})();

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