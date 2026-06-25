import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.24:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.24. A small maintenance release.

- Fixes the Anaconda engine's missing "about" configuration.
- Removes the terminated ChinaSo media engines.

Full changes: https://github.com/searxng/searxng/compare/952896d29...e3126b89e`,
    es_ES: `Actualiza SearXNG a 2026.6.24. Una pequeña versión de mantenimiento.

- Corrige la configuración "about" que faltaba en el motor Anaconda.
- Elimina los motores de medios ChinaSo descontinuados.

Cambios completos: https://github.com/searxng/searxng/compare/952896d29...e3126b89e`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.24. Eine kleine Wartungsversion.

- Behebt die fehlende "about"-Konfiguration der Anaconda-Suchmaschine.
- Entfernt die eingestellten ChinaSo-Medien-Suchmaschinen.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/952896d29...e3126b89e`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.24. Niewielka wersja konserwacyjna.

- Naprawia brakującą konfigurację „about" w wyszukiwarce Anaconda.
- Usuwa wycofane wyszukiwarki multimediów ChinaSo.

Pełna lista zmian: https://github.com/searxng/searxng/compare/952896d29...e3126b89e`,
    fr_FR: `Met à jour SearXNG vers 2026.6.24. Une petite version de maintenance.

- Corrige la configuration « about » manquante du moteur Anaconda.
- Supprime les moteurs de médias ChinaSo arrêtés.

Changements complets : https://github.com/searxng/searxng/compare/952896d29...e3126b89e`,
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
