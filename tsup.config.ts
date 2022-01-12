import { defineConfig } from 'tsup';
import { isDev } from './scripts/utils';

export default defineConfig(() => ({
  entry: {
    'background/index': './src/background/index.ts',
  },
  outDir: 'extension/dist',
  format: ['iife'],
  splitting: false,
  sourcemap: isDev ? 'inline' : false,
  define: {
    __DEV__: JSON.stringify(isDev),
  },
  minifyWhitespace: !isDev,
  minifySyntax: !isDev,
}));
