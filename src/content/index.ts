/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import { createApp } from 'vue'
import 'vue-global-api'
import App from './Content.vue'

(() => {
  const div = document.createElement('main')
  div.style.position = 'fixed'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.zIndex = '99999'

  const shadowDOM = div.attachShadow({ mode: 'closed' })
  const app = document.createElement('div')

  shadowDOM.appendChild(app)
  document.body.appendChild(div)

  createApp(App, { globalWindow: window }).mount(app)
})()

// communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
})
