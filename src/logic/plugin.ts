import type { App } from 'vue'
import { getCurrentContext } from 'webext-bridge'

export default {
  install: (app: App) => {
    // Inject a globally available $app object
    app.config.globalProperties.$app = {
      context: getCurrentContext(),
    }

    // Provide access to `app` in script setup with `const app = inject('app')`
    app.provide('app', app.config.globalProperties.$app)
  },
}
