import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.13:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.13.

- New search engines: ChatNoir, s1search, abcnyheter (Norway) and ResultHunter.
- Image results now list alternative formats.
- Fixes: DuckDuckGo result titles containing HTML, and a Tiger crash on empty results.

Full changes: https://github.com/searxng/searxng/compare/de8a3de15...d14fa1f6e`,
    es_ES: `Actualiza SearXNG a 2026.6.13.

- Nuevos motores de búsqueda: ChatNoir, s1search, abcnyheter (Noruega) y ResultHunter.
- Los resultados de imágenes ahora muestran formatos alternativos.
- Correcciones: títulos de resultados de DuckDuckGo con HTML y un fallo de Tiger con resultados vacíos.

Cambios completos: https://github.com/searxng/searxng/compare/de8a3de15...d14fa1f6e`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.13.

- Neue Suchmaschinen: ChatNoir, s1search, abcnyheter (Norwegen) und ResultHunter.
- Bildergebnisse listen jetzt alternative Formate auf.
- Korrekturen: DuckDuckGo-Ergebnistitel mit HTML sowie ein Tiger-Absturz bei leeren Ergebnissen.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/de8a3de15...d14fa1f6e`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.13.

- Nowe wyszukiwarki: ChatNoir, s1search, abcnyheter (Norwegia) oraz ResultHunter.
- Wyniki obrazów wyświetlają teraz alternatywne formaty.
- Poprawki: tytuły wyników DuckDuckGo zawierające HTML oraz awaria Tiger przy pustych wynikach.

Pełna lista zmian: https://github.com/searxng/searxng/compare/de8a3de15...d14fa1f6e`,
    fr_FR: `Met à jour SearXNG vers 2026.6.13.

- Nouveaux moteurs de recherche : ChatNoir, s1search, abcnyheter (Norvège) et ResultHunter.
- Les résultats d'images affichent désormais des formats alternatifs.
- Corrections : titres de résultats DuckDuckGo contenant du HTML et un plantage de Tiger sur des résultats vides.

Changements complets : https://github.com/searxng/searxng/compare/de8a3de15...d14fa1f6e`,
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
