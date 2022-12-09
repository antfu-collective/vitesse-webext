import { createApp } from 'vue'
import App from './Options.vue'
import plugin from '~/logic/plugin'
import '../styles'

const app = createApp(App)
app.use(plugin)
app.mount('#app')
