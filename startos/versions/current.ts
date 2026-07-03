import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.7.3:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.7.3.

- Adds the sina general search engine.
- Fixes searchzee results by circumventing bot-blocking.
- Refreshes the web client and Python dependencies, translations, and CI; otherwise a maintenance release.

Full changes: https://github.com/searxng/searxng/compare/774616ada...747cec4c2`,
    es_ES: `Actualiza SearXNG a 2026.7.3.

- Añade el motor de búsqueda general sina.
- Corrige los resultados de searchzee evitando el bloqueo de bots.
- Actualiza el cliente web y las dependencias de Python, las traducciones y la CI; por lo demás, es una versión de mantenimiento.

Cambios completos: https://github.com/searxng/searxng/compare/774616ada...747cec4c2`,
    de_DE: `Aktualisiert SearXNG auf 2026.7.3.

- Fügt die allgemeine Suchmaschine sina hinzu.
- Behebt searchzee-Ergebnisse durch Umgehung der Bot-Blockierung.
- Aktualisiert Web-Client- und Python-Abhängigkeiten, Übersetzungen und CI; ansonsten eine Wartungsversion.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/774616ada...747cec4c2`,
    pl_PL: `Aktualizuje SearXNG do 2026.7.3.

- Dodaje ogólną wyszukiwarkę sina.
- Naprawia wyniki searchzee, omijając blokowanie botów.
- Odświeża klienta web i zależności Pythona, tłumaczenia oraz CI; poza tym jest to wydanie konserwacyjne.

Pełna lista zmian: https://github.com/searxng/searxng/compare/774616ada...747cec4c2`,
    fr_FR: `Met à jour SearXNG vers 2026.7.3.

- Ajoute le moteur de recherche général sina.
- Corrige les résultats de searchzee en contournant le blocage des bots.
- Met à jour le client web et les dépendances Python, les traductions et la CI ; sinon une version de maintenance.

Changements complets : https://github.com/searxng/searxng/compare/774616ada...747cec4c2`,
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
