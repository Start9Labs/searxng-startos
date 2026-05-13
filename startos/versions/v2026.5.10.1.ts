import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const v_2026_5_10_1 = VersionInfo.of({
  version: '2026.5.10:1',
  releaseNotes: {
    en_US: `**Bumps**

- SearXNG → 2026.5.10 (engine fixes for Wikidata, Startpage, 360search, Yep, Karmasearch, Mwmbl; documentation theme switched to Furo; routine dependency updates)
- start-sdk → 1.5.0`,
    es_ES: `**Cambios de versión**

- SearXNG → 2026.5.10 (correcciones en motores Wikidata, Startpage, 360search, Yep, Karmasearch, Mwmbl; documentación migrada al tema Furo; actualizaciones rutinarias de dependencias)
- start-sdk → 1.5.0`,
    de_DE: `**Versionssprünge**

- SearXNG → 2026.5.10 (Suchmaschinen-Fixes für Wikidata, Startpage, 360search, Yep, Karmasearch, Mwmbl; Dokumentations-Theme auf Furo umgestellt; routinemäßige Abhängigkeits-Updates)
- start-sdk → 1.5.0`,
    pl_PL: `**Aktualizacje wersji**

- SearXNG → 2026.5.10 (poprawki silników Wikidata, Startpage, 360search, Yep, Karmasearch, Mwmbl; dokumentacja przeniesiona na motyw Furo; rutynowe aktualizacje zależności)
- start-sdk → 1.5.0`,
    fr_FR: `**Mises à jour de version**

- SearXNG → 2026.5.10 (corrections des moteurs Wikidata, Startpage, 360search, Yep, Karmasearch, Mwmbl ; thème de la documentation passé à Furo ; mises à jour de dépendances de routine)
- start-sdk → 1.5.0`,
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
