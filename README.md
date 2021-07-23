# Web Extensions Vite Starter

A [Vite](https://vitejs.dev/)-powered web extension ([Chrome](https://developer.chrome.com/docs/extensions/reference/), [FireFox](https://addons.mozilla.org/en-US/developers/), etc.) starter template.

<img width="655" src="https://user-images.githubusercontent.com/11247099/126741643-813b3773-17ff-4281-9737-f319e00feddc.png">
<img width="655" src="https://user-images.githubusercontent.com/11247099/126741653-43125b62-6578-4452-83a7-bee19be2eaa2.png">

## Features

- ⚡️ **Instant HMR** - use **Vite** on dev (no more refresh!).
- 🥝 Vue 3 - Composition API, [`<script setup>` syntax](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md) and more!
- 💬 Effortless communications - powered by [`webext-bridge`](https://github.com/antfu/webext-bridge) and [VueUse](https://github.com/antfu/vueuse) storage.
- 🍃 [Windi CSS](https://windicss.org/) - on-demand CSS utilities.
- 🦾 [TypeScript](https://www.typescriptlang.org/) - type safe.
- 📦 [Components auto importing](./views/components)
- 🌟 [Icons](./views/components) - Access to icons from any iconset directly
- 🌍 WebExtension - isomorphic extension for Chrome, Firefox and others.

## Pre-packed

### Libraries

- [`webextension-polyfill-ts`](https://github.com/Lusito/webextension-polyfill-ts) - WebExtension browser API Polyfill with types
- [`webext-bridge`](https://github.com/antfu/webext-bridge) - effortlessly communication between contexts
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs
- [`vue-global-api`](https://github.com/antfu/vue-global-api) - use Vue Composition API globally

### Vite Plugins

- [`vite-plugin-components`](https://github.com/antfu/vite-plugin-components) - components auto import
- [`vite-plugin-windicss`](https://github.com/antfu/vite-plugin-windicss) - WindiCSS support

### UI Frameworks

- [Windi CSS](https://github.com/windicss/windicss) - next generation utility-first CSS framework.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [`vite-plugin-icons`](https://github.com/antfu/vite-plugin-icons) - icons as Vue components

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

## Use the Template

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/antfu/vitess-webext/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit antfu/vitesse-webext my-webext
cd my-webext
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Usage

### Folders

- `views` - frontend for the extension (popup and options).
- `src` - background scripts and content scripts.
- `extension` - extension package root, also holds `manifest.json` and assets.
- `scripts` - development helper scripts.

### Development

```bash
pnpm dev
```

Then **Load extension in browser**,

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `extension`.

## Variants

This is a variant of [Vitesse](https://github.com/antfu/vitesse), check out the [full variants list](https://github.com/antfu/vitesse#variations).
