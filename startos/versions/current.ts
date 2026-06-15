import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.15:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.15. A small maintenance release: normalized engine configuration attributes and fixed language support for engines that declare their languages via traits.

Full changes: https://github.com/searxng/searxng/compare/b3e08f2a4...cf1410af8`,
    es_ES: `Actualiza SearXNG a 2026.6.15. Una pequeña versión de mantenimiento: se normalizaron los atributos de configuración de los motores y se corrigió el soporte de idiomas para los motores que declaran sus idiomas mediante traits.

Cambios completos: https://github.com/searxng/searxng/compare/b3e08f2a4...cf1410af8`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.15. Eine kleine Wartungsversion: Die Konfigurationsattribute der Suchmaschinen wurden normalisiert und die Sprachunterstützung für Suchmaschinen behoben, die ihre Sprachen über Traits angeben.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/b3e08f2a4...cf1410af8`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.15. Niewielkie wydanie konserwacyjne: znormalizowano atrybuty konfiguracji wyszukiwarek i naprawiono obsługę języków dla wyszukiwarek deklarujących swoje języki za pomocą traits.

Pełna lista zmian: https://github.com/searxng/searxng/compare/b3e08f2a4...cf1410af8`,
    fr_FR: `Met à jour SearXNG vers 2026.6.15. Une petite version de maintenance : normalisation des attributs de configuration des moteurs et correction de la prise en charge des langues pour les moteurs qui déclarent leurs langues via des traits.

Changements complets : https://github.com/searxng/searxng/compare/b3e08f2a4...cf1410af8`,
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
