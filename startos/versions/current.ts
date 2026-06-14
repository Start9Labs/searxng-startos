import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.14:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.14.

- New search engines: vuhuv, Podchaser (podcasts), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de and searchzee.

Full changes: https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
    es_ES: `Actualiza SearXNG a 2026.6.14.

- Nuevos motores de búsqueda: vuhuv, Podchaser (podcasts), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de y searchzee.

Cambios completos: https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.14.

- Neue Suchmaschinen: vuhuv, Podchaser (Podcasts), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de und searchzee.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.14.

- Nowe wyszukiwarki: vuhuv, Podchaser (podcasty), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de oraz searchzee.

Pełna lista zmian: https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
    fr_FR: `Met à jour SearXNG vers 2026.6.14.

- Nouveaux moteurs de recherche : vuhuv, Podchaser (podcasts), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de et searchzee.

Changements complets : https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
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
