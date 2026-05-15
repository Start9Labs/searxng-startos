import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const v_2026_5_15_1 = VersionInfo.of({
  version: '2026.5.15:1',
  releaseNotes: {
    en_US: `**Bumps**

- SearXNG → 2026.5.15 (upstream bugfixes, translation updates, and dependency bumps)`,
    es_ES: `**Actualizaciones**

- SearXNG → 2026.5.15 (correcciones de errores del proyecto original, actualizaciones de traducciones y de dependencias)`,
    de_DE: `**Aktualisierungen**

- SearXNG → 2026.5.15 (Upstream-Fehlerbehebungen, Übersetzungs- und Abhängigkeitsaktualisierungen)`,
    pl_PL: `**Aktualizacje**

- SearXNG → 2026.5.15 (poprawki błędów ze źródła, aktualizacje tłumaczeń i zależności)`,
    fr_FR: `**Mises à jour**

- SearXNG → 2026.5.15 (corrections de bugs en amont, mises à jour des traductions et des dépendances)`,
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
