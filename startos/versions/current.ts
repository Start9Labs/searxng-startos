import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.19:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.19. A maintenance release: fixes a calculator crash on invalid expressions, assigns proper categories to several xpath engines (ayo, gabanza, zapmeta, abcnyheter), and refreshes translations.

Full changes: https://github.com/searxng/searxng/compare/bd73cc09e...5c38d2fea`,
    es_ES: `Actualiza SearXNG a 2026.6.19. Versión de mantenimiento: corrige un fallo de la calculadora con expresiones no válidas, asigna categorías correctas a varios motores xpath (ayo, gabanza, zapmeta, abcnyheter) y actualiza las traducciones.

Cambios completos: https://github.com/searxng/searxng/compare/bd73cc09e...5c38d2fea`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.19. Eine Wartungsversion: behebt einen Absturz des Taschenrechners bei ungültigen Ausdrücken, weist mehreren xpath-Suchmaschinen (ayo, gabanza, zapmeta, abcnyheter) korrekte Kategorien zu und aktualisiert die Übersetzungen.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/bd73cc09e...5c38d2fea`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.19. Wydanie konserwacyjne: naprawia awarię kalkulatora przy nieprawidłowych wyrażeniach, przypisuje właściwe kategorie kilku wyszukiwarkom xpath (ayo, gabanza, zapmeta, abcnyheter) i odświeża tłumaczenia.

Pełna lista zmian: https://github.com/searxng/searxng/compare/bd73cc09e...5c38d2fea`,
    fr_FR: `Met à jour SearXNG vers 2026.6.19. Une version de maintenance : corrige un plantage de la calculatrice sur les expressions invalides, attribue des catégories correctes à plusieurs moteurs xpath (ayo, gabanza, zapmeta, abcnyheter) et met à jour les traductions.

Changements complets : https://github.com/searxng/searxng/compare/bd73cc09e...5c38d2fea`,
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
