import {
  VersionInfo,
  IMPOSSIBLE,
  FileHelper,
  matches,
} from '@start9labs/start-sdk'
import { rm } from 'fs/promises'
import { settingsYaml } from '../../fileModels/settings.yml'
import { defaultSettings } from '../../utils'

export const v2025_8_9_1 = VersionInfo.of({
  version: '2025.8.9:1-alpha.0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // Read legacy config from start9/config.yaml
      const legacyConfig = await FileHelper.yaml(
        {
          volumeId: 'main',
          subpath: 'start9/config.yaml',
        },
        matches.object({
          'instance-name': matches.string.optional(),
          'enable-metrics': matches.boolean.optional(),
        }),
      )
        .read()
        .once()

      // Start with default settings and apply legacy values if they exist
      const settings = {
        ...defaultSettings,
        general: {
          ...defaultSettings.general,
          instance_name:
            legacyConfig?.['instance-name'] ??
            defaultSettings.general.instance_name,
          enable_metrics:
            legacyConfig?.['enable-metrics'] ??
            defaultSettings.general.enable_metrics,
        },
      }

      // Write the new settings
      await settingsYaml.write(effects, settings)

      // Clean up legacy folder
      await rm('/media/startos/volumes/main/start9', { recursive: true }).catch(
        console.error,
      )
    },
    down: IMPOSSIBLE,
  },
})
