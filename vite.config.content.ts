import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config'
import { r, isDev } from './scripts/utils'

// bundling the content script using Vite
export default defineConfig({
  build: {
    watch: isDev
      ? {
        include: [
          r('src/contentScripts/**/*'),
          r('src/components/**/*'),
        ],
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
