import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.14:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.14.

- New search engines: vuhuv, Podchaser (podcasts), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de and searchzee.
- New "Manage Access" action: optionally require a login (username "admin" plus a password you set) to use your instance — covers both the Web UI and the Stats Dashboard. Instances remain public by default.

Full changes: https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
    es_ES: `Actualiza SearXNG a 2026.6.14.

- Nuevos motores de búsqueda: vuhuv, Podchaser (podcasts), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de y searchzee.
- Nueva acción "Gestionar acceso": opcionalmente requiere un inicio de sesión (usuario "admin" y una contraseña que usted establece) para usar su instancia, protegiendo tanto la interfaz web como el panel de estadísticas. Las instancias siguen siendo públicas de forma predeterminada.

Cambios completos: https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.14.

- Neue Suchmaschinen: vuhuv, Podchaser (Podcasts), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de und searchzee.
- Neue Aktion „Zugriff verwalten": optional eine Anmeldung erforderlich machen (Benutzer „admin" plus ein von Ihnen festgelegtes Passwort), um Ihre Instanz zu nutzen — schützt sowohl die Web-UI als auch das Statistik-Dashboard. Instanzen bleiben standardmäßig öffentlich.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.14.

- Nowe wyszukiwarki: vuhuv, Podchaser (podcasty), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de oraz searchzee.
- Nowa akcja „Zarządzaj dostępem": opcjonalnie wymagaj logowania (użytkownik „admin" oraz hasło, które ustalasz), aby korzystać z instancji — chroni zarówno interfejs webowy, jak i panel statystyk. Instancje domyślnie pozostają publiczne.

Pełna lista zmian: https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
    fr_FR: `Met à jour SearXNG vers 2026.6.14.

- Nouveaux moteurs de recherche : vuhuv, Podchaser (podcasts), PrivacyWall, fastbot, reloado, rawweb, Luxxle, t-online, ayo.de et searchzee.
- Nouvelle action « Gérer l'accès » : exiger en option une connexion (utilisateur « admin » plus un mot de passe que vous définissez) pour utiliser votre instance — protège à la fois l'interface web et le tableau de bord des statistiques. Les instances restent publiques par défaut.

Changements complets : https://github.com/searxng/searxng/compare/d14fa1f6e...b3e08f2a4`,
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
