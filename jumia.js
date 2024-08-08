'use strict';

/*
const puppeteer = require('puppeteer');

(async()=>{
  const browser = await puppeteer.launch({headless: false })
  const page = await browser.newPage();

   const searchTerm = "television";
   const url = `https://www.jumia.co.ke/catalog/?q=${encodeURIComponent(searchTerm)}`;

   try{
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.prd._fb', { timeout: 60000 });

      const data =  await page. evaluate(()=>{
      const tvs=document.querySelectorAll('.prd._fb')
      const results=[]

          tvs.forEach((tv)=>{
            const name=  tv.querySelector('.name')?.innerText.trim()
            const initial_price=  tv.querySelector('.old')?.innerText.trim()
            const current_price=  tv.querySelector('.prc')?.innerText.trim()
            const percentage_discount=  tv.querySelector('.bdg._dsct')?.innerText.trim()

            if(name && initial_price && current_price && percentage_discount) {
              results.push({name ,initial_price,current_price,percentage_discount}) ;
            }
          })
         return results;

    })
    console.log(data)
    
   }catch(err){
    console.error(`Error: ${err.message}`) ;
   }finally{
    await browser.close()
   }

})()  */



//SAME CODE BUT DATA IS STORED IN A CSV FILE


/*


const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const searchTerm = "television";
  const url = `https://www.jumia.co.ke/catalog/?q=${encodeURIComponent(searchTerm)}`;

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the elements that indicate the page is loaded
    await page.waitForSelector('article.prd._fb', { timeout: 60000 });

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

    // Convert data to CSV format
    const csvData = data.map(row => 
      `${row.name},${row.initial_price},${row.current_price},${row.percentage_discount}`
    ).join('\n');

    // Define CSV headers
    const csvHeader = 'Name,Initial Price,Current Price,Percentage Discount\n';

    // Write CSV file
    const filePath = path.join(__dirname, 'jumia_televisions.csv');
    fs.writeFileSync(filePath, csvHeader + csvData, 'utf8');

    console.log(`Data has been saved to ${filePath}`);

  } catch (err) {
    console.error(`Error: ${err.message}`);
  } finally {
    await browser.close();
  }
})(); 

*/



//SAME CODE BUT DATA IS STORED IN A JSON FILE

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const searchTerm = "television";
  const url = `https://www.jumia.co.ke/catalog/?q=${encodeURIComponent(searchTerm)}`;

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the elements that indicate the page is loaded
    await page.waitForSelector('article.prd._fb', { timeout: 60000 });

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

    // Define the path for the JSON file
    const filePath = path.join(__dirname, 'jumia_televisions.json');

    // Write JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    console.log(`Data has been saved to ${filePath}`);

  } catch (err) {
    console.error(`Error: ${err.message}`);
  } finally {
    await browser.close();
  }
})();


