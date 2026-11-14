import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.11.14:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.11.14. Requires StartOS 0.4.2 or later.

- **Action required:** Wikipedia, Wikidata and OpenStreetMap now require a way to reach whoever runs the instance, and stay off until you set a **Contact Address** in the **Config** action.
- Fixes for the Brave, DuckDuckGo, Qwant, Yep, Seznam, Tiger and ResultHunter engines
- New engine: ReaderFunded

[Full upstream changes](https://github.com/searxng/searxng/compare/b00212a83...a7128d5d1)`,
    es_ES: `SearXNG actualizado a 2026.11.14. Requiere StartOS 0.4.2 o posterior.

- **Acción necesaria:** Wikipedia, Wikidata y OpenStreetMap ahora requieren una forma de contactar a quien administra la instancia, y permanecen desactivados hasta que configure una **Dirección de contacto** en la acción **Configuración**.
- Correcciones para los motores Brave, DuckDuckGo, Qwant, Yep, Seznam, Tiger y ResultHunter
- Nuevo motor: ReaderFunded

[Todos los cambios de upstream](https://github.com/searxng/searxng/compare/b00212a83...a7128d5d1)`,
    de_DE: `SearXNG auf 2026.11.14 aktualisiert. Erfordert StartOS 0.4.2 oder neuer.

- **Handlung erforderlich:** Wikipedia, Wikidata und OpenStreetMap verlangen jetzt eine Möglichkeit, den Betreiber der Instanz zu erreichen, und bleiben deaktiviert, bis Sie in der Aktion **Konfiguration** eine **Kontaktadresse** festlegen.
- Korrekturen für die Suchmaschinen Brave, DuckDuckGo, Qwant, Yep, Seznam, Tiger und ResultHunter
- Neue Suchmaschine: ReaderFunded

[Alle Upstream-Änderungen](https://github.com/searxng/searxng/compare/b00212a83...a7128d5d1)`,
    pl_PL: `Zaktualizowano SearXNG do 2026.11.14. Wymaga StartOS 0.4.2 lub nowszego.

- **Wymagane działanie:** Wikipedia, Wikidata i OpenStreetMap wymagają teraz możliwości kontaktu z osobą prowadzącą instancję i pozostają wyłączone, dopóki nie ustawisz **Adresu kontaktowego** w akcji **Konfiguracja**.
- Poprawki wyszukiwarek Brave, DuckDuckGo, Qwant, Yep, Seznam, Tiger i ResultHunter
- Nowa wyszukiwarka: ReaderFunded

[Wszystkie zmiany upstream](https://github.com/searxng/searxng/compare/b00212a83...a7128d5d1)`,
    fr_FR: `SearXNG mis à jour vers 2026.11.14. Nécessite StartOS 0.4.2 ou une version ultérieure.

- **Action requise :** Wikipédia, Wikidata et OpenStreetMap exigent désormais un moyen de joindre la personne qui gère l'instance, et restent désactivés tant que vous n'avez pas défini une **Adresse de contact** dans l'action **Configuration**.
- Corrections pour les moteurs Brave, DuckDuckGo, Qwant, Yep, Seznam, Tiger et ResultHunter
- Nouveau moteur : ReaderFunded

[Toutes les modifications en amont](https://github.com/searxng/searxng/compare/b00212a83...a7128d5d1)`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
