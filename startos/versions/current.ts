import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.10.15:2',
  releaseNotes: {
    en_US:
      'Services on this server, such as Open WebUI web search, can use SearXNG while it requires a login. Update Open WebUI too.',
    es_ES:
      'Los servicios de este servidor, como la búsqueda web de Open WebUI, pueden usar SearXNG mientras requiere inicio de sesión. Actualice también Open WebUI.',
    de_DE:
      'Dienste auf diesem Server, etwa die Websuche von Open WebUI, können SearXNG nutzen, während es eine Anmeldung verlangt. Aktualisieren Sie auch Open WebUI.',
    pl_PL:
      'Usługi na tym serwerze, takie jak wyszukiwanie w sieci w Open WebUI, mogą korzystać z SearXNG, gdy wymaga ono logowania. Zaktualizuj też Open WebUI.',
    fr_FR:
      'Les services de ce serveur, comme la recherche web d’Open WebUI, peuvent utiliser SearXNG lorsqu’il exige une connexion. Mettez aussi Open WebUI à jour.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
