import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config'
import { r, isDev } from './scripts/utils'

export default defineConfig({
  build: {
    watch: isDev
      ? {
        include: r('src/contentScripts/**'),
      }
      : undefined,
    outDir: r('extension/dist/contentScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      entry: r('src/contentScripts/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.global.js',
      },
    },
  },
  ...sharedConfig,
})
