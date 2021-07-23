// register vue composition api globally
import 'vue-global-api'
import { createApp } from 'vue'
import App from './App.vue'
import '../styles'

const app = createApp(App)
app.mount('#app')
