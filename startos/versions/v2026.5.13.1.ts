import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const v_2026_5_13_1 = VersionInfo.of({
  version: '2026.5.13:1',
  releaseNotes: {
    en_US: `**Bumps**

- SearXNG → 2026.5.13`,
    es_ES: `**Actualizaciones**

- SearXNG → 2026.5.13`,
    de_DE: `**Aktualisierungen**

- SearXNG → 2026.5.13`,
    pl_PL: `**Aktualizacje**

- SearXNG → 2026.5.13`,
    fr_FR: `**Mises à jour**

- SearXNG → 2026.5.13`,
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
