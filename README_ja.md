# ![icon](public/icon/icon_38.png) クッキーJSONファイル出力 for Puppeteer

[Puppeteer](https://pptr.dev/)でインポート可能なクッキーJSONファイルを出力するブラウザ拡張機能です。

## インストール

ストア掲載準備中です。

## 使用方法

拡張機能のアイコンをクリックすると、現在開いているページで保存されているクッキー情報をJSONファイルとして保存できます。

![image1](resource/image1_ja.png)
![image2](resource/image2.png)

保存したJSONファイルは以下のように使用できます。

```js
const puppeteer = require('puppeteer');
  .
  .
  .
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const cookies = JSON.parse(fs.readFileSync(<エクスポートしたクッキーJSONファイル>, 'utf-8'));
for (const cookie of cookies) {
  await page.setCookie(cookie);
}
await page.goto(...);
```

## ライセンス

[MIT license](http://www.opensource.org/licenses/mit-license)で配布します。

&copy; 2020 [ktty1220](mailto:ktty1220@gmail.com)
