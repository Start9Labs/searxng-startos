import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const v_2026_5_2_1 = VersionInfo.of({
  version: '2026.5.2:1',
  releaseNotes: {
    en_US:
      'Update to upstream SearXNG 2026.5.2. Enable JSON search output so SearXNG can serve as a search backend for clients like Open WebUI.',
    es_ES:
      'Actualización a SearXNG 2026.5.2. Habilita la salida JSON de búsqueda para que SearXNG pueda servir como backend de búsqueda para clientes como Open WebUI.',
    de_DE:
      'Aktualisierung auf SearXNG 2026.5.2. JSON-Suchausgabe aktivieren, damit SearXNG als Such-Backend für Clients wie Open WebUI dienen kann.',
    pl_PL:
      'Aktualizacja do SearXNG 2026.5.2. Włączenie wyjścia JSON w wyszukiwarce, dzięki czemu SearXNG może służyć jako zaplecze wyszukiwania dla klientów takich jak Open WebUI.',
    fr_FR:
      'Mise à jour vers SearXNG 2026.5.2. Activer la sortie JSON de recherche afin que SearXNG puisse servir de backend de recherche pour les clients comme Open WebUI.',
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
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

        // Clean up legacy folder
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
