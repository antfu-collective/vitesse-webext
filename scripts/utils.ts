import { resolve } from 'path'
import { bgCyan, black } from 'kolorist'

export const port = parseInt(process.env.PORT || '') || 3303
export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const isDev = process.argv[2] === 'dev'

export function log(name: string, message: string) {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message)
}
