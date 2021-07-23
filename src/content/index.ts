/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'

console.info('[vitesse-webext] Hello world from content script')

// communication example: send previous tab title from background page
onMessage<any>('tab-prev', (e) => {
  console.log(`[vitesse-webext] Navigate from page "${e.data.title}"`)
})
