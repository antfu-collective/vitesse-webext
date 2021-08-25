/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import browser from 'webextension-polyfill'
import { createApp } from 'vue'
import App from './Content.vue'

const isDev = browser.runtime.getManifest()?.content_security_policy?.includes('http://localhost') === true

console.info('[vitesse-webext] Hello world from content script')

// communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
})

// mount component to context window
const container = document.createElement('div')
const shadowDOM = container.attachShadow?.({ mode: isDev ? 'open' : 'closed' }) || container
const linkElem = document.createElement('link')
linkElem.setAttribute('rel', 'stylesheet')
linkElem.setAttribute('href', browser.extension.getURL('dist/contentScripts/style.css'))
shadowDOM.appendChild(linkElem)
const root = document.createElement('div')
shadowDOM.appendChild(root)
document.body.appendChild(container)
createApp(App, { globalWindow: window }).mount(root)
