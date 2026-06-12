import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.12:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.12.

- New search engines: Fireball (general, news, videos) and Dogpile (general, news, images, videos).
- Added support for Kagi (requires an API key).

Full changes: https://github.com/searxng/searxng/compare/f4c63c8eb...de8a3de15`,
    es_ES: `Actualiza SearXNG a 2026.6.12.

- Nuevos motores de búsqueda: Fireball (general, noticias, vídeos) y Dogpile (general, noticias, imágenes, vídeos).
- Se añade compatibilidad con Kagi (requiere una clave de API).

Cambios completos: https://github.com/searxng/searxng/compare/f4c63c8eb...de8a3de15`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.12.

- Neue Suchmaschinen: Fireball (allgemein, Nachrichten, Videos) und Dogpile (allgemein, Nachrichten, Bilder, Videos).
- Unterstützung für Kagi hinzugefügt (erfordert einen API-Schlüssel).

Vollständige Änderungen: https://github.com/searxng/searxng/compare/f4c63c8eb...de8a3de15`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.12.

- Nowe wyszukiwarki: Fireball (ogólne, wiadomości, wideo) oraz Dogpile (ogólne, wiadomości, obrazy, wideo).
- Dodano obsługę Kagi (wymaga klucza API).

Pełna lista zmian: https://github.com/searxng/searxng/compare/f4c63c8eb...de8a3de15`,
    fr_FR: `Met à jour SearXNG vers 2026.6.12.

- Nouveaux moteurs de recherche : Fireball (général, actualités, vidéos) et Dogpile (général, actualités, images, vidéos).
- Ajout de la prise en charge de Kagi (nécessite une clé API).

Changements complets : https://github.com/searxng/searxng/compare/f4c63c8eb...de8a3de15`,
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
