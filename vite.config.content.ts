import { resolve } from 'path'
import { defineConfig } from 'vite'
import getPagesViteConfig from './vite.config.pages'

const isDev = process.env.NODE_ENV !== 'production'
const r = (...args: string[]) => resolve(__dirname, ...args)

export default defineConfig(({ command }) => {
  // @ts-expect-error
  return Object.assign(getPagesViteConfig(command), {
    root: r('src'),
    base: undefined,
    server: undefined,
    build: {
      outDir: r('extension/dist/content'),
      cssCodeSplit: false,
      emptyOutDir: false,
      sourcemap: isDev ? 'inline' : false,
      lib: {
        entry: r('src/content/index.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
        },
      },
    },
  })
})
