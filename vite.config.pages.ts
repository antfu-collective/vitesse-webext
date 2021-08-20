import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import windiConfig from './windi.config'

const port = parseInt(process.env.PORT || '') || 3303
const isDev = process.env.NODE_ENV !== 'production'
const r = (...args: string[]) => resolve(__dirname, ...args)

export default defineConfig(({ command }) => {
  return {
    root: r('src'),
    base: command === 'serve' ? `http://localhost:${port}/` : undefined,
    resolve: {
      alias: {
        '~/': `${r('src')}/`,
      },
    },
    server: {
      port,
      hmr: {
        host: 'localhost',
      },
    },
    build: {
      outDir: r('extension/dist'),
      emptyOutDir: false,
      sourcemap: isDev ? 'inline' : false,
      // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
      terserOptions: {
        mangle: false,
      },
      rollupOptions: {
        input: {
          background: r('src/background/index.html'),
          options: r('src/options/index.html'),
          popup: r('src/popup/index.html'),
        },
      },
    },
    plugins: [
      Vue(),
      ViteComponents({
        dirs: [r('src/components')],
        // generate `components.d.ts` for ts support with Volar
        globalComponentsDeclaration: true,
        // auto import icons
        customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
          ViteIconsResolver({
            componentPrefix: '',
          }),
        ],
      }),

      // https://github.com/antfu/vite-plugin-icons
      ViteIcons(),

      // https://github.com/antfu/vite-plugin-windicss
      WindiCSS({
        config: windiConfig,
      }),

      // rewrite assets to use relative path
      {
        name: 'assets-rewrite',
        enforce: 'post',
        apply: 'build',
        transformIndexHtml(html) {
          return html.replace(/"\/assets\//g, '"../assets/')
        },
      },
    ],

    optimizeDeps: {
      include: [
        'vue',
        '@vueuse/core',
      ],
      exclude: [
        'vue-demi',
      ],
    },
  }
})
