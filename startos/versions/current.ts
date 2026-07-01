import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.7.1:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.7.1.

- Adds the new sina search engine.
- Fixes searchzee results by working around bot-blocking, and cleans up engine setup/init internals.

Full changes: https://github.com/searxng/searxng/compare/774616ada...c5d8d05f0`,
    es_ES: `Actualiza SearXNG a 2026.7.1.

- Añade el nuevo motor de búsqueda sina.
- Corrige los resultados de searchzee evitando el bloqueo de bots y limpia la lógica interna de configuración e inicialización de motores.

Cambios completos: https://github.com/searxng/searxng/compare/774616ada...c5d8d05f0`,
    de_DE: `Aktualisiert SearXNG auf 2026.7.1.

- Fügt die neue Suchmaschine sina hinzu.
- Behebt searchzee-Ergebnisse durch Umgehung der Bot-Blockierung und bereinigt die interne Einrichtung und Initialisierung von Suchmaschinen.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/774616ada...c5d8d05f0`,
    pl_PL: `Aktualizuje SearXNG do 2026.7.1.

- Dodaje nową wyszukiwarkę sina.
- Naprawia wyniki searchzee, omijając blokowanie botów, oraz porządkuje wewnętrzną konfigurację i inicjalizację wyszukiwarek.

Pełna lista zmian: https://github.com/searxng/searxng/compare/774616ada...c5d8d05f0`,
    fr_FR: `Met à jour SearXNG vers 2026.7.1.

- Ajoute le nouveau moteur de recherche sina.
- Corrige les résultats de searchzee en contournant le blocage des bots et nettoie la configuration et l'initialisation internes des moteurs.

Changements complets : https://github.com/searxng/searxng/compare/774616ada...c5d8d05f0`,
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
