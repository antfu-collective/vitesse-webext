/* eslint-disable no-console */
import browser from 'webextension-polyfill'
import { detect } from 'detect-browser'

const isFirefox = detect()?.name === 'firefox'

// Firefox fetchs files from cache instead of reloading changes from disk, hmr will not work as Chromium based browser
browser.webNavigation.onCommitted.addListener(({ tabId, frameId }) => {
  // Filter out non main window events.
  if (frameId !== 0) return

  // inject the latest scripts
  browser.tabs.executeScript(tabId, {
    file: `${isFirefox ? '' : '.'}/dist/contentScripts/index.global.js`,
    runAt: 'document_end',
  }).catch(error => console.error(error))
})
