import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.26:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.26. A trivial release containing only updated Russian translations.

Full changes: https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
    es_ES: `Actualiza SearXNG a 2026.6.26. Una versión trivial que solo contiene traducciones al ruso actualizadas.

Cambios completos: https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.26. Eine triviale Version, die nur aktualisierte russische Übersetzungen enthält.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.26. Trywialna wersja zawierająca jedynie zaktualizowane tłumaczenia rosyjskie.

Pełna lista zmian: https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
    fr_FR: `Met à jour SearXNG vers 2026.6.26. Une version triviale contenant uniquement des traductions russes mises à jour.

Changements complets : https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
  },
  migrations: {
    up: async ({ effects }) => {
      const configYaml:
        | {
            'instance-name'?: string
            'enable-metrics'?: boolean
          }
        | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await settingsYaml.merge(effects, {
          general: {
            instance_name: configYaml['instance-name'],
            enable_metrics: configYaml['enable-metrics'],
          },
        })

        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
