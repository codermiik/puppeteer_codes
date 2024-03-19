const puppeteer = require('puppeteer');

const scrapeTripAdvisor = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const searchUrl = 'https://www.tripadvisor.com/Restaurants-g187813-Trieste_Province_of_Trieste_Friuli_Venezia_Giulia.html';
    await page.goto(searchUrl);


    await page.waitForSelector('.restaurants-list-List__listContents');

    const restaurantData = await page.evaluate(() => {
      const restaurantItems = document.querySelectorAll('.restaurants-list-List__item');

      const restaurantInfo = [];

      restaurantItems.forEach((item) => {
        const name = item.querySelector('.restaurants-list-List__info a')?.innerText.trim();
        const address = item.querySelector('.restaurants-list-List__info span')?.innerText.trim();
        const phoneNumber = item.querySelector('.restaurants-list-List__info .restaurants-list-List__telephone')?.innerText.trim();

        if (name) {
          restaurantInfo.push({ name, address, phoneNumber });
        }
      });

      return restaurantInfo;
    });

    console.log(restaurantData);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
};

scrapeTripAdvisor();
