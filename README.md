# ![icon](public/icon/icon_38.png) Export cookie JSON file for Puppeteer

Browser extension that outputs a cookie JSON file that can be imported by [Puppeteer](https://pptr.dev/).

## Install

* [Google Chrome](https://chrome.google.com/webstore/detail/nmckokihipjgplolmcmjakknndddifde)
* [Firefox](https://addons.mozilla.org/ja/firefox/addon/%E3%82%AF%E3%83%83%E3%82%AD%E3%83%BCjson%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%87%BA%E5%8A%9B-for-puppeteer/)

## Usage

By clicking on the extension icon, you can save the cookie information stored on the currently open page as a JSON file.

![image1](resource/image1_en.png)
![image2](resource/image2.png)

The saved JSON file can be used as follows.

```js
const puppeteer = require('puppeteer');
  .
  .
  .
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const cookies = JSON.parse(fs.readFileSync(<Exported cookie JSON file>, 'utf-8'));
for (const cookie of cookies) {
  await page.setCookie(cookie);
}
await page.goto(...);
```

## License

[MIT license](http://www.opensource.org/licenses/mit-license)

&copy; 2020 [ktty1220](mailto:ktty1220@gmail.com)
