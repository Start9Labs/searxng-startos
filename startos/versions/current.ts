import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.26:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.26. A translations-only maintenance release with no functional changes.

Full changes: https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
    es_ES: `Actualiza SearXNG a 2026.6.26. Una versión de mantenimiento solo de traducciones, sin cambios funcionales.

Cambios completos: https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.26. Eine reine Übersetzungs-Wartungsversion ohne funktionale Änderungen.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.26. Wersja konserwacyjna zawierająca wyłącznie tłumaczenia, bez zmian funkcjonalnych.

Pełna lista zmian: https://github.com/searxng/searxng/compare/e3126b89e...f8ffbf36f`,
    fr_FR: `Met à jour SearXNG vers 2026.6.26. Une version de maintenance ne contenant que des traductions, sans changement fonctionnel.

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
