import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.8:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.8.

- New search engines: heexy (general, images), seek-ninja (general), tiger.ch.
- Fixes: aol now uses the Wikidata ID for C++; yep sends Sec-Fetch headers to bypass "access denied".

Full changes: https://github.com/searxng/searxng/compare/2026.6.7-86903a2c6...2026.6.8-f3fab143b`,
    es_ES: `Actualiza SearXNG a 2026.6.8.

- Nuevos motores de búsqueda: heexy (general, imágenes), seek-ninja (general), tiger.ch.
- Correcciones: aol ahora usa el ID de Wikidata para C++; yep envía cabeceras Sec-Fetch para evitar el «acceso denegado».

Cambios completos: https://github.com/searxng/searxng/compare/2026.6.7-86903a2c6...2026.6.8-f3fab143b`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.8.

- Neue Suchmaschinen: heexy (allgemein, Bilder), seek-ninja (allgemein), tiger.ch.
- Korrekturen: aol verwendet nun die Wikidata-ID für C++; yep sendet Sec-Fetch-Header, um „Zugriff verweigert“ zu umgehen.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/2026.6.7-86903a2c6...2026.6.8-f3fab143b`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.8.

- Nowe wyszukiwarki: heexy (ogólna, obrazy), seek-ninja (ogólna), tiger.ch.
- Poprawki: aol używa teraz identyfikatora Wikidata dla C++; yep wysyła nagłówki Sec-Fetch, aby ominąć „odmowę dostępu”.

Pełna lista zmian: https://github.com/searxng/searxng/compare/2026.6.7-86903a2c6...2026.6.8-f3fab143b`,
    fr_FR: `Met à jour SearXNG vers 2026.6.8.

- Nouveaux moteurs de recherche : heexy (général, images), seek-ninja (général), tiger.ch.
- Corrections : aol utilise désormais l'identifiant Wikidata pour le C++ ; yep envoie les en-têtes Sec-Fetch pour contourner « accès refusé ».

Changements complets : https://github.com/searxng/searxng/compare/2026.6.7-86903a2c6...2026.6.8-f3fab143b`,
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
