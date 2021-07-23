import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import windiConfig from './windi.config'

const port = parseInt(process.env.PORT || '') || 3303
const r = (...args: string[]) => resolve(__dirname, ...args)

export default defineConfig(({ command }) => {
  return {
    root: r('views'),
    base: command === 'serve' ? `http://localhost:${port}/` : undefined,
    resolve: {
      alias: {
        '~/': `${r('views')}/`,
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
      rollupOptions: {
        input: {
          popup: r('views/popup/index.html'),
          options: r('views/options/index.html'),
        },
      },
    },
    plugins: [
      Vue(),
      ViteComponents({
        dirs: [r('views/components')],
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
