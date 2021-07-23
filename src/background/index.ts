import 'crx-bridge'
import { browser } from 'webextension-polyfill-ts'

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed')
})
