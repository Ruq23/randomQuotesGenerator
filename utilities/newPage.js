const puppeteer = require('puppeteer');

let page;

const getPage = async () => {
  if (page) return page;

  const browser = await puppeteer.launch({
    headless: true,
  });

  page = await browser.newPage();

  return page;
};

module.exports = getPage;