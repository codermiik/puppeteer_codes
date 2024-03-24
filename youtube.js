'use strict';
/*const puppeteer = require('puppeteer');
var fs = require('fs');
const url = 'https://youtube.com';

async function getUserData (user) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`${url}/@${user}` , { timeout: 60000 }), { waitUntil: "domcontentloaded"};

    const data = await page.evaluate(() => {
        const channelName = document.getElementById('channel-name')?.innerText
        const channelHandle = document.getElementById('channel-handle')?.innerText
        const totalSubscribers = document.getElementById('subscriber-count')?.innerText
        const totalVideos = document.getElementById('videos-count')?.innerText
        return { channelName, channelHandle, totalSubscribers, totalVideos };
    });

    await browser.close();
    return data;
}

const users = ['mkbhd', 'mrbeast', 'apple', 'google', 'microsoft'];

const usersData = users.map(async (user) => {
    const res = await getUserData(user);
    return res;
});

Promise.all(usersData).then(data => {
    fs.writeFile('profileData.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) console.log('Failed to create file!');
        return err;
    });
    console.log(data);
});
*/


const puppeteer = require('puppeteer');
const url = 'https://youtube.com';


(async()=> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const users = ['mkbhd', 'mrbeast', /*'apple', 'google', 'microsoft'*/];
   
    try{
      for(const user of users){
        await page.goto(`${url}/@${user}` , { timeout: 60000 }), { waitUntil: "domcontentloaded"};
        const data = await page.evaluate(() => {
            const channelName = document.getElementById('channel-name')?.innerText
            const channelHandle = document.getElementById('channel-handle')?.innerText
            const totalSubscribers = document.getElementById('subscriber-count')?.innerText
            const totalVideos = document.getElementById('videos-count')?.innerText
            
            return { channelName, channelHandle, totalSubscribers, totalVideos };
            
        });
       
      console.log(data)
   
    }
    }catch(err){
      console.log(`Error: ${err.message}`)
    }finally{
      await browser.close();
      
   }
 

 })()


