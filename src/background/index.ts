import { sendMessage, onMessage } from 'webext-bridge'
import { browser } from 'webextension-polyfill-ts'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

let previousTabId = 0

// communication example: send previous tab title from background page
// see shim.d.ts for type decleration
browser.tabs.onActivated.addListener(async({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }
  const tab = await browser.tabs.get(previousTabId)
  previousTabId = tabId
  if (!tab)
    return

  // eslint-disable-next-line no-console
  console.log('previous tab', tab)
  sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
})

onMessage('get-current-tab', async() => {
  try {
    const tab = await browser.tabs.get(previousTabId)
    return {
      title: tab?.id,
    }
  }
  catch {
    return {
      title: undefined,
    }
  }
})
