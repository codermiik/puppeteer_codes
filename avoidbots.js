const puppeteer=require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const {executablePath}=require('puppeteer')



 const url='https://bot.sannysoft.com/'

 const main=async () => {
 
    const browser=await puppeteer.launch({headless: false, executablePath: executablePath()})
    const page=await browser.newPage()
    await page.goto(url)
    const screenshotPath = `./${url.replace(/[:\/.]/g, '_')}.jpg`; 
    await page.screenshot({path:screenshotPath})
    console.log('bot successfully passed all tests') 

    await browser.close()
      
}

main();