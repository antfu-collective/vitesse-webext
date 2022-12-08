import { createApp } from 'vue'
import App from './Options.vue'
import '../styles'

const app = createApp(App)
app.config.globalProperties.$app = { context: 'options' }
app.provide('app', app.config.globalProperties.$app)
app.mount('#app')
