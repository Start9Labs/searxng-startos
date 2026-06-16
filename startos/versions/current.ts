import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.16:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.16. A small maintenance release: a deprecation warning for the obsolete engine \`about.language\` property, and a fix for minimal container setup.

Full changes: https://github.com/searxng/searxng/compare/cf1410af8...502c820a2`,
    es_ES: `Actualiza SearXNG a 2026.6.16. Una pequeña versión de mantenimiento: un aviso de obsolescencia para la propiedad obsoleta \`about.language\` de los motores y una corrección para la configuración mínima del contenedor.

Cambios completos: https://github.com/searxng/searxng/compare/cf1410af8...502c820a2`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.16. Eine kleine Wartungsversion: eine Veraltungswarnung für die obsolete Suchmaschinen-Eigenschaft \`about.language\` und eine Korrektur für die minimale Container-Einrichtung.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/cf1410af8...502c820a2`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.16. Niewielkie wydanie konserwacyjne: ostrzeżenie o wycofaniu nieaktualnej właściwości wyszukiwarki \`about.language\` oraz poprawka minimalnej konfiguracji kontenera.

Pełna lista zmian: https://github.com/searxng/searxng/compare/cf1410af8...502c820a2`,
    fr_FR: `Met à jour SearXNG vers 2026.6.16. Une petite version de maintenance : un avertissement d'obsolescence pour la propriété obsolète \`about.language\` des moteurs et une correction pour la configuration minimale du conteneur.

Changements complets : https://github.com/searxng/searxng/compare/cf1410af8...502c820a2`,
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
