import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.5.29:0',
  releaseNotes: {
    en_US: 'Bumps SearXNG → 2026.5.29.',
    es_ES: 'Actualiza SearXNG → 2026.5.29.',
    de_DE: 'Aktualisiert SearXNG → 2026.5.29.',
    pl_PL: 'Aktualizuje SearXNG → 2026.5.29.',
    fr_FR: 'Met à jour SearXNG → 2026.5.29.',
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
