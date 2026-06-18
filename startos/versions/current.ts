import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.18:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.18. Adds the Swiss search.ch/web engine and fixes the chinaso engine to handle empty upstream results gracefully.

Full changes: https://github.com/searxng/searxng/compare/502c820a2...bd73cc09e`,
    es_ES: `Actualiza SearXNG a 2026.6.18. Añade el motor suizo search.ch/web y corrige el motor chinaso para gestionar correctamente los resultados vacíos del proveedor.

Cambios completos: https://github.com/searxng/searxng/compare/502c820a2...bd73cc09e`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.18. Fügt die Schweizer Suchmaschine search.ch/web hinzu und behebt die chinaso-Suchmaschine, sodass leere Ergebnisse der Quelle korrekt behandelt werden.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/502c820a2...bd73cc09e`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.18. Dodaje szwajcarską wyszukiwarkę search.ch/web i naprawia wyszukiwarkę chinaso, aby poprawnie obsługiwała puste wyniki z serwera źródłowego.

Pełna lista zmian: https://github.com/searxng/searxng/compare/502c820a2...bd73cc09e`,
    fr_FR: `Met à jour SearXNG vers 2026.6.18. Ajoute le moteur suisse search.ch/web et corrige le moteur chinaso pour gérer correctement les résultats vides du fournisseur.

Changements complets : https://github.com/searxng/searxng/compare/502c820a2...bd73cc09e`,
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
