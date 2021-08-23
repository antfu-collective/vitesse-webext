/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import { createApp } from 'vue'
import 'vue-global-api'
import App from './Content.vue'

const app = document.createElement('div')
document.body.appendChild(app)
createApp(App).mount(app)

console.info('[vitesse-webext] Hello world from content script')

// communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
})
