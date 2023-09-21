const puppeteer=require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const {executablePath}=require('puppeteer')


 const url='https://bot.sannysoft.com/'

 const main=async () => {
    const browser=await puppeteer.launch({headless: false, executablePath: executablePath()})
    const page=await browser.newPage()
    await page.goto(url)
    await page.screenshot({path:'bot.jpg'})
  
    await browser.close()

}

main()