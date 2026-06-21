import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.20:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.20. A maintenance release that fixes the ChatNoir engine to stop re-using and caching session keys.

Full changes: https://github.com/searxng/searxng/compare/5c38d2fea...fd42d4fda`,
    es_ES: `Actualiza SearXNG a 2026.6.20. Versión de mantenimiento que corrige el motor ChatNoir para que deje de reutilizar y almacenar en caché las claves de sesión.

Cambios completos: https://github.com/searxng/searxng/compare/5c38d2fea...fd42d4fda`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.20. Eine Wartungsversion, die die ChatNoir-Suchmaschine korrigiert, sodass sie Sitzungsschlüssel nicht mehr wiederverwendet und zwischenspeichert.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/5c38d2fea...fd42d4fda`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.20. Wydanie konserwacyjne, które naprawia wyszukiwarkę ChatNoir, aby przestała ponownie używać i buforować klucze sesji.

Pełna lista zmian: https://github.com/searxng/searxng/compare/5c38d2fea...fd42d4fda`,
    fr_FR: `Met à jour SearXNG vers 2026.6.20. Une version de maintenance qui corrige le moteur ChatNoir afin qu'il cesse de réutiliser et de mettre en cache les clés de session.

Changements complets : https://github.com/searxng/searxng/compare/5c38d2fea...fd42d4fda`,
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
