/* global chrome */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request !== 'getCookies') return false;

  const noCookies = { cookies: null };
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, (tabs) => {
    if (tabs.length === 0) {
      sendResponse(noCookies);
      return;
    }
    const url = tabs[0].url;
    if (!/^http/.test(url)) {
      sendResponse(noCookies);
      return;
    }

    chrome.cookies.getAll({ url }, (cookies) => {
      sendResponse({
        domain: url.match(/\/\/([^/]+)/)[1],
        cookies: cookies.map((c) => {
          const result = {
            name: c.name,
            value: c.value,
            domain: c.domain,
            path: c.path,
            expires: c.expirationDate || -1,
            httpOnly: c.httpOnly,
            secure: c.secure
          };
          if (['lax', 'strict'].includes(c.sameSite)) {
            result.sameSite = c.sameSite.replace(/^./, (p) => p.toUpperCase());
          }
          return result;
        })
      });
    });
  });

  return true;
});
