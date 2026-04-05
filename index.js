const puppeteer = require('puppeteer');

(async () => {
  const text = process.env.POST_TEXT;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://www.threads.net/login');

  // 👉 первый раз логинишься вручную локально
  // 👉 потом копируешь cookies

  const cookies = JSON.parse(process.env.COOKIES);
  await page.setCookie(...cookies);

  await page.goto('https://www.threads.net/');

  await page.waitForSelector('textarea');

  await page.click('textarea');
  await page.keyboard.type(text, { delay: 50 });

  await page.keyboard.press('Enter');

  await page.waitForTimeout(5000);

  await browser.close();
})();
