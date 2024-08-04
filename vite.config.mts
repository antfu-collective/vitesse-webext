/// <reference types="vitest" />

import { dirname, relative } from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import type { ImportsMap } from 'unplugin-auto-import/types'
import { ViteConfigType } from './scripts/enums/vite'
import { isDev, port, r } from './scripts/utils'
import packageJson from './package.json'

export const generateSharedConfig: (type: ViteConfigType) => UserConfig = (type) => {
  const isBackground = type === ViteConfigType.Background

  const importsList: ImportsMap = isBackground
    ? {
        'webextension-polyfill': [['*', 'browser']],
      }
    : {
        'webextension-polyfill': [['default', 'browser']],
      }

  return {
    root: r('src'),
    resolve: {
      alias: {
        '~/': `${r('src')}/`,
      },
    },
    define: {
      __DEV__: isDev,
      __NAME__: JSON.stringify(packageJson.name),
    },
    plugins: [
      Vue(),

      AutoImport({
        imports: [
          'vue',
          importsList,
        ],
        dts: isBackground ? r('src/auto-imports.d.ts') : false,
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: [r('src/components')],
        // generate `components.d.ts` for ts support with Volar
        dts: r('src/components.d.ts'),
        resolvers: [
        // auto import icons
          IconsResolver({
            prefix: '',
          }),
        ],
      }),

      // https://github.com/antfu/unplugin-icons
      Icons(),

      // https://github.com/unocss/unocss
      UnoCSS(),

      // rewrite assets to use relative path
      {
        name: 'assets-rewrite',
        enforce: 'post',
        apply: 'build',
        transformIndexHtml(html, { path }) {
          return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
        },
      },
    ],
    optimizeDeps: {
      include: [
        'vue',
        '@vueuse/core',
        'webextension-polyfill',
      ],
      exclude: [
        'vue-demi',
      ],
    },
  }
}

export default defineConfig(({ command }) => ({
  ...generateSharedConfig(ViteConfigType.Shared),
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
    origin: `http://localhost:${port}`,
  },
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
        sidepanel: r('src/sidepanel/index.html'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
}))
