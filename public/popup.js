/* global chrome, Blob */
document.querySelector('.message').textContent = chrome.i18n.getMessage('important_message');

chrome.runtime.sendMessage('getCookies', (res) => {
  const { domain, cookies } = res;
  const $content = document.querySelector('#content');
  let $result = null;
  if (!cookies || cookies.length === 0) {
    $result = document.createElement('span');
    $result.textContent = chrome.i18n.getMessage('no_cookies'); ;
  } else {
    $result = document.createElement('a');
    $result.setAttribute('download', `${domain}.cookies.json`);
    $result.setAttribute('href', URL.createObjectURL(
      new Blob([JSON.stringify(cookies, null, 2)], { type: 'text/plain' }))
    );
    $result.textContent = chrome.i18n.getMessage('download_json');
  }
  $content.removeChild(document.querySelector('.loading'));
  $content.appendChild($result);
});
