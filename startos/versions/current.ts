import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { mainHostId } from '../interfaces'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '2026.9.30:1',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.9.30.

Complete upstream changes: https://github.com/searxng/searxng/compare/f372096fb...a9d990033

- The network port left reserved by the StartOS 0.3.5 version of this package is freed. If that version had a Tor address, SearXNG moves it to the Web UI, keeping the same .onion address, as soon as a version of Tor that allows it is installed.
- The Config descriptions of Instance Name, Primary URL and Enable Stats say what each setting does, and Manage Access describes each Access option.
- Manage Access shows its results in your language.`,
    es_ES: `Se actualizó SearXNG a 2026.9.30.

Cambios completos del proyecto original: https://github.com/searxng/searxng/compare/f372096fb...a9d990033

- Se libera el puerto de red que la versión de este paquete para StartOS 0.3.5 dejó reservado. Si esa versión tenía una dirección Tor, SearXNG la traslada a la Interfaz web, conservando la misma dirección .onion, en cuanto se instala una versión de Tor que lo permita.
- En Configuración, las descripciones de Nombre de instancia, URL principal y Habilitar estadísticas explican qué hace cada ajuste, y Gestionar acceso describe cada opción de Acceso.
- Gestionar acceso muestra sus resultados en su idioma.`,
    de_DE: `SearXNG wurde auf 2026.9.30 aktualisiert.

Vollständige Änderungen des Upstream-Projekts: https://github.com/searxng/searxng/compare/f372096fb...a9d990033

- Der Netzwerkport, den die StartOS-0.3.5-Version dieses Pakets belegt gelassen hatte, wird freigegeben. Hatte diese Version eine Tor-Adresse, verlegt SearXNG sie auf die Web-UI und behält dieselbe .onion-Adresse, sobald eine Tor-Version installiert ist, die das erlaubt.
- In „Konfiguration“ erklären die Beschreibungen von Instanzname, Primäre URL und Statistiken aktivieren, was jede Einstellung bewirkt, und „Zugriff verwalten“ beschreibt jede Zugriffsoption.
- „Zugriff verwalten“ zeigt seine Ergebnisse in Ihrer Sprache an.`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.9.30.

Pełna lista zmian projektu nadrzędnego: https://github.com/searxng/searxng/compare/f372096fb...a9d990033

- Port sieciowy, który wersja tego pakietu dla StartOS 0.3.5 pozostawiła zajęty, zostaje zwolniony. Jeśli ta wersja miała adres Tor, SearXNG przenosi go do interfejsu webowego, zachowując ten sam adres .onion, gdy tylko zostanie zainstalowana wersja Tora, która na to pozwala.
- W „Konfiguracji” opisy pól Nazwa instancji, Główny URL i Włącz statystyki wyjaśniają, co robi każde ustawienie, a „Zarządzaj dostępem” opisuje każdą opcję Dostępu.
- „Zarządzaj dostępem” pokazuje wyniki w Twoim języku.`,
    fr_FR: `SearXNG a été mis à jour vers la version 2026.9.30.

Modifications complètes du projet en amont : https://github.com/searxng/searxng/compare/f372096fb...a9d990033

- Le port réseau que la version de ce paquet pour StartOS 0.3.5 avait laissé réservé est libéré. Si cette version avait une adresse Tor, SearXNG la déplace vers l'interface web, en conservant la même adresse .onion, dès qu'une version de Tor qui le permet est installée.
- Dans Configuration, les descriptions de Nom de l'instance, URL principale et Activer les statistiques expliquent ce que fait chaque réglage, et Gérer l'accès décrit chaque option d'Accès.
- Gérer l'accès affiche ses résultats dans votre langue.`,
  },
  migrations: {
    up: async ({ effects }) => {
      // Tor keeps an .onion on a retired port as unused; reattachTorOnions moves it to 80.
      if (await sdk.MultiHost.of(effects, mainHostId).retirePort(8080)) {
        await storeJson.merge(effects, { reattachTorOnions: true })
      }
    },
    down: IMPOSSIBLE,
  },
})
