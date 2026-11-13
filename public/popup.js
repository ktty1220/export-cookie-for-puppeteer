/* global chrome, Blob */
document.querySelector('.message').textContent = chrome.i18n.getMessage('important_message');

chrome.runtime.sendMessage('getCookies', (res) => {
  const { domain, cookies } = res;
  const $content = document.querySelector('#content');
  let $result = null;
  if (!cookies || cookies.length === 0) {
    $result = document.createElement('span');
    $result.textContent = chrome.i18n.getMessage('no_cookies');
  } else {
    const json = JSON.stringify(cookies, null, 2);
    $result = document.createElement('div');

    const $download = document.createElement('a');
    $download.setAttribute('download', `${domain}.cookies.json`);
    $download.setAttribute('href', URL.createObjectURL(
      new Blob([json], { type: 'text/plain' }))
    );
    $download.textContent = chrome.i18n.getMessage('download_json');

    const $copy = document.createElement('button');
    $copy.type = 'button';
    $copy.className = 'copy';
    $copy.textContent = chrome.i18n.getMessage('copy_json');
    $copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(json);
        $copy.textContent = chrome.i18n.getMessage('copied');
      } catch (e) {
        $copy.textContent = chrome.i18n.getMessage('copy_failed');
      }
      setTimeout(() => {
        $copy.textContent = chrome.i18n.getMessage('copy_json');
      }, 1500);
    });

    $result.appendChild($download);
    $result.appendChild($copy);
  }
  $content.removeChild(document.querySelector('.loading'));
  $content.appendChild($result);
});
