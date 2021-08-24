import browser from 'webextension-polyfill'

browser.webNavigation.onCommitted.addListener(({ tabId, frameId }) => {
  // Filter out non main window events.
  if (frameId !== 0) return

  // inject the latest scripts
  browser.tabs.executeScript(tabId, {
    file: 'dist/contentScripts/index.global.js',
    runAt: 'document_end',
  }).catch(error => console.error(error))
  browser.tabs.insertCSS(tabId, {
    file: 'dist/contentScripts/style.css',
    runAt: 'document_start',
  }).catch(error => console.error(error))
})
