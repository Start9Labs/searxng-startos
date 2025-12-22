import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { rm, readFile } from 'fs/promises'
import { settingsYaml } from '../../fileModels/settings.yml'
import { defaultSettings } from '../../utils'

export const v2025_12_19_1 = VersionInfo.of({
  version: '2025.12.19:1-beta.0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
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
        // Write settings
        await settingsYaml.write(effects, {
          ...defaultSettings,
          general: {
            ...defaultSettings.general,
            instance_name:
              configYaml['instance-name'] ??
              defaultSettings.general.instance_name,
            enable_metrics:
              configYaml['enable-metrics'] ??
              defaultSettings.general.enable_metrics,
          },
        })

        // Clean up legacy folder
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        })
      }
    },
    down: IMPOSSIBLE,
  },
})
