import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import { sharedConfig } from './vite.config'
import { r, isDev } from './scripts/utils'
import windiConfig from './windi.config'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  define: {
    __DEV__: isDev,
  },
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
  plugins: [
    ...sharedConfig.plugins!,

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      config: {
        ...windiConfig,
        // disable preflight to avoid css population
        preflight: false,
      },
    }),
  ],
})
