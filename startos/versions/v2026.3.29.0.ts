import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const v_2026_3_29_0 = VersionInfo.of({
  version: '2026.3.29:0',
  releaseNotes: {
    en_US: 'Update SearXNG to 2026.3.29',
    es_ES: 'Actualización de SearXNG a 2026.3.29',
    de_DE: 'Update von SearXNG auf 2026.3.29',
    pl_PL: 'Aktualizacja SearXNG do 2026.3.29',
    fr_FR: 'Mise à jour de SearXNG vers 2026.3.29',
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
