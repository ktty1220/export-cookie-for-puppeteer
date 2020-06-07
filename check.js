#!/usr/bin/env/node

/**
 * Usage: node check.js <URL>
 *
 * Place the Cookie JSON file exported by the extension in the same directory before run.
 */
const puppeteer = require('puppeteer');
const url = process.argv[2];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const cookies = require(`./${url.match(/\/\/([^/]+)/)[1]}.cookies.json`);
  for (const cookie of cookies) {
    await page.setCookie(cookie);
  }
  await page.goto(url);
})();
