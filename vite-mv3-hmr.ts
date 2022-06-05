import { dirname, join } from 'path'
import type { HMRPayload, PluginOption } from 'vite'
import fs from 'fs-extra'
import { r, isWin } from './scripts/utils'

const targetDir = r('extension')

export const MV3Hmr = (): PluginOption => {
  return {
    name: 'vite-mv3-hmr',
    apply: 'serve',
    enforce: 'post',
    async configureServer(server) {
      const originWsSend: (payload: HMRPayload) => void = server.ws.send

      server.ws.send = async function (payload: HMRPayload) {
        if (payload.type === 'update') {
          for (const update of payload.updates) {
            await writeToDisk(update.path)
            if (update.acceptedPath !== update.path)
              await writeToDisk(update.acceptedPath)
          }

          payload.updates = payload.updates.map((update) => {
            const isJsUpdate = update.type === 'js-update'

            if (!isJsUpdate)
              return update

            return {
              ...update,
              path: `${update.path}.js`,
              acceptedPath: `${update.acceptedPath}.js`,
            }
          })
        }
        originWsSend.call(this, payload)
      }

      async function writeToDisk(url: string) {
        const result = await server.transformRequest(url.replace(/^\/@id\//, ''))
        let code = result?.code
        if (!code)
          return

        const urlModule = await server.moduleGraph.getModuleByUrl(url)
        const importedModules = urlModule?.importedModules

        if (importedModules) {
          for (const mod of importedModules) {
            code = code.replace(mod.url, normalizeViteUrl(isWin
              ? mod.url.replace(/[A-Z]:\//,'').replace(/:/,'.')
              : mod.url,
              mod.type)) // fix invalid colon in /@fs/C:, /@id/plugin-vue:export-helper
            writeToDisk(mod.url)
          }
        }

        if (urlModule?.url) {
          code = code
            .replace(/\/@vite\/client/g, '/dist/mv3client.mjs')
            .replace(/(\/\.vite\/deps\/\S+?)\?v=\w+/g, '$1')
          if (isWin) { code = code
            .replace(/(from\s+["']\/@fs\/)[A-Z]:\//g, '$1')
          };


          const targetFile = normalizeFsUrl(isWin
            ? urlModule.url.replace(/[A-Z]:\//,'').replace(/:/,'.')
            : urlModule.url,
            urlModule.type) // fix invalid colon in /@fs/C:, /@id/plugin-vue:export-helper
          await fs.ensureDir(dirname(targetFile))
          await fs.writeFile(targetFile, code)
        }
      }

      Object.keys(server.config.build.rollupOptions.input!).map(entry => writeToDisk(`/${entry}/main.ts`))
    },
  }
}

function normalizeViteUrl(url: string, type: string) {
  url = url.replace(/\?v=\w+$/, '')

  if (type === 'js' && !url.endsWith('.js') && !url.endsWith('.mjs'))
    url = `${url}.js`

  return url
}

function normalizeFsUrl(url: string, type: string) {
  return join(targetDir, normalizeViteUrl(url, type).replace(/^\//, ''))
}
