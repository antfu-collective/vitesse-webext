/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import browser from 'webextension-polyfill'
import { createApp } from 'vue'
import App from './Content.vue'

console.info('[vitesse-webext] Hello world from content script')

// communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
})

// mount component to context window
const container = document.createElement('div')
const shadowDOM = container.attachShadow?.({ mode: 'closed' }) || container
const styleUrl = browser.extension.getURL('dist/contentScripts/style.css')
fetch(styleUrl, { method: 'GET' })
  .then(res => res.text())
  .then((css) => {
    const _stylecContainer = document.createElement('div')
    _stylecContainer.innerHTML = `<style>${css}</style>`
    shadowDOM.appendChild(_stylecContainer)
  })
const root = document.createElement('div')
shadowDOM.appendChild(root)
document.body.appendChild(container)
createApp(App, { globalWindow: window }).mount(root)
