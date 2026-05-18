import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const v_2026_5_17_2 = VersionInfo.of({
  version: '2026.5.17:2',
  releaseNotes: {
    en_US: 'Upstream patch: adds cara.app search engine.',
    es_ES: 'Parche de upstream: añade el motor de búsqueda cara.app.',
    de_DE: 'Upstream-Patch: fügt die Suchmaschine cara.app hinzu.',
    pl_PL: 'Łatka upstream: dodaje wyszukiwarkę cara.app.',
    fr_FR: 'Correctif amont : ajoute le moteur de recherche cara.app.',
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
