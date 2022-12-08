import { createApp } from 'vue'
import App from './Options.vue'
import '../styles'

const app = createApp(App)
app.config.globalProperties.$app = { context: 'options' }
app.mount('#app')
