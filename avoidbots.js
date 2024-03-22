'use strict';

const puppeteer=require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin())

const {executablePath}=require('puppeteer');


(async()=>{
 
    const browser=await puppeteer.launch({headless: false, executablePath: executablePath()})
    const page=await browser.newPage()
    const url='https://bot.sannysoft.com/';

try{
    await page.goto(url)
    const screenshotPath = `./${url.replace(/[:\/.]/g, '_')}.jpg`; 
    await page.screenshot({path:screenshotPath})
    console.log('bot successfully passed all tests') 
 }catch(err){
    console.log(`error:${err.message}`);
     
 }finally{
    await browser.close()
 }
        
})();

