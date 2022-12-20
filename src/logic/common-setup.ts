import type { App } from 'vue'
import { getCurrentContext } from 'webext-bridge'

export function setupApp(app: App) {
  // Inject a globally available `$app` object in template
  app.config.globalProperties.$app = {
    context: getCurrentContext(),
  }

  // Provide access to `app` in script setup with `const app = inject('app')`
  app.provide('app', app.config.globalProperties.$app)
}
