import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const v_2026_5_2_2 = VersionInfo.of({
  version: '2026.5.2:2',
  releaseNotes: {
    en_US:
      'Add Engine API Keys action — configure API keys for paid SearXNG engines (Brave Search API, Wolfram Alpha API, or any other engine module via "Other") without editing settings.yml manually. Resolves #21.',
    es_ES:
      'Nueva acción «Claves API de motores»: configura claves API para motores de SearXNG de pago (Brave Search API, Wolfram Alpha API o cualquier otro módulo de motor mediante «Otro») sin editar settings.yml manualmente. Resuelve #21.',
    de_DE:
      'Neue Aktion «Suchmaschinen-API-Schlüssel»: konfiguriere API-Schlüssel für kostenpflichtige SearXNG-Suchmaschinen (Brave Search API, Wolfram Alpha API oder beliebige andere Module über «Andere»), ohne settings.yml manuell zu bearbeiten. Behebt #21.',
    pl_PL:
      'Nowa akcja „Klucze API silników": konfiguracja kluczy API dla płatnych silników SearXNG (Brave Search API, Wolfram Alpha API lub dowolnego innego modułu silnika za pomocą „Inny") bez ręcznej edycji settings.yml. Rozwiązuje #21.',
    fr_FR:
      "Nouvelle action « Clés API des moteurs » : configurer les clés API pour les moteurs SearXNG payants (Brave Search API, Wolfram Alpha API ou tout autre module via « Autre ») sans éditer settings.yml manuellement. Résout #21.",
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
