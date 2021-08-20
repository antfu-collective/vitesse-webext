import type { Options } from 'tsup'

const isDev = process.env.NODE_ENV !== 'production'

export const tsup: Options = {
  entryPoints: ['src/content'],
  outDir: 'extension/dist/content',
  format: ['iife'],
  splitting: false,
  sourcemap: isDev ? 'inline' : false,
  minifyWhitespace: !isDev,
}
