import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.10:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.10.

- New DuckDuckGo web engine as an alternative to html.duckduckgo.com.
- Hardening: the SQLite database schema is now created during app initialization.

Full changes: https://github.com/searxng/searxng/compare/f3fab143b...f4c63c8eb`,
    es_ES: `Actualiza SearXNG a 2026.6.10.

- Nuevo motor web de DuckDuckGo como alternativa a html.duckduckgo.com.
- Refuerzo: el esquema de la base de datos SQLite ahora se crea durante la inicialización de la aplicación.

Cambios completos: https://github.com/searxng/searxng/compare/f3fab143b...f4c63c8eb`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.10.

- Neue DuckDuckGo-Web-Suchmaschine als Alternative zu html.duckduckgo.com.
- Härtung: Das SQLite-Datenbankschema wird nun während der App-Initialisierung erstellt.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/f3fab143b...f4c63c8eb`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.10.

- Nowa wyszukiwarka internetowa DuckDuckGo jako alternatywa dla html.duckduckgo.com.
- Wzmocnienie: schemat bazy danych SQLite jest teraz tworzony podczas inicjalizacji aplikacji.

Pełna lista zmian: https://github.com/searxng/searxng/compare/f3fab143b...f4c63c8eb`,
    fr_FR: `Met à jour SearXNG vers 2026.6.10.

- Nouveau moteur web DuckDuckGo en alternative à html.duckduckgo.com.
- Renforcement : le schéma de la base de données SQLite est désormais créé lors de l'initialisation de l'application.

Changements complets : https://github.com/searxng/searxng/compare/f3fab143b...f4c63c8eb`,
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
