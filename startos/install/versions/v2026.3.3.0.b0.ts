import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { rm, readFile } from 'fs/promises'
import { settingsYaml } from '../../fileModels/settings.yml'

export const v2026_3_3_0_b0 = VersionInfo.of({
  version: '2026.3.3:0-beta.0',
  releaseNotes: {
    en_US: 'Revamped for StartOS 0.4.0',
    es_ES: 'Renovado para StartOS 0.4.0',
    de_DE: 'Überarbeitet für StartOS 0.4.0',
    pl_PL: 'Przebudowano dla StartOS 0.4.0',
    fr_FR: 'Remanié pour StartOS 0.4.0',
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
