/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import { createApp } from 'vue'
import App from './Content.vue'

console.info('[vitesse-webext] Hello world from content script')

// communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
})

// mount component to context window
const container = document.createElement('div')!
const shadowDOM = container.attachShadow?.({ mode: 'closed' }) || container
const root = document.createElement('div')
shadowDOM.appendChild(root)
document.body.appendChild(container)
createApp(App, { globalWindow: window }).mount(root)
