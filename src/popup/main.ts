import { createApp } from 'vue'
import App from './Popup.vue'
import '../styles'

const app = createApp(App)
app.config.globalProperties.$app = { context: 'popup' }
app.provide('app', app.config.globalProperties.$app) // To access `app` in script setup : const app = inject('app')
app.mount('#app')
