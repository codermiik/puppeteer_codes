'use strict';

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

})()