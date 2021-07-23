// generate stub index.html files for dev entry
import { resolve } from 'path'
import fs from 'fs-extra'

const port = parseInt(process.env.PORT || '') || 3303
const r = (...args: string[]) => resolve(__dirname, '..', ...args)

const views = [
  'options',
  'popup',
]

async function run() {
  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`))
    let data = await fs.readFile(r(`views/${view}/index.html`), 'utf-8')
    data = data.replace('"./main.ts"', `"http://localhost:${port}/${view}/main.ts"`)
    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, 'utf-8')
    // eslint-disable-next-line no-console
    console.log(`✅ stub ${view}`)
  }
}

run()
