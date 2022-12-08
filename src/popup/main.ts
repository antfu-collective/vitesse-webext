import { createApp } from 'vue'
import App from './Popup.vue'
import '../styles'

const app = createApp(App)
app.config.globalProperties.$app = { context: 'popup' }
app.mount('#app')
