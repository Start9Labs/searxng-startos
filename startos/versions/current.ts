import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.10.15:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.10.15.

- Fixes searches with Dogpile, PrivacyWall, Wikidata and XPrivo; adds suggestions for S1Search.
- Simplifies DOI resolver preferences, prioritizes infoboxes with images and translates keyboard shortcut help.
- Renames the image proxy endpoint to /image; the bundled reverse proxy caches the new path.
- Updates start-sdk to 3.0.6. Manage Access credentials remain copyable and are not offered as links to open.

Complete upstream changes: https://github.com/searxng/searxng/compare/a9d990033...b00212a83`,
    es_ES: `Se actualizó SearXNG a 2026.10.15.

- Corrige las búsquedas con Dogpile, PrivacyWall, Wikidata y XPrivo; añade sugerencias para S1Search.
- Simplifica las preferencias del resolvedor DOI, prioriza los cuadros informativos con imágenes y traduce la ayuda de los atajos de teclado.
- Cambia la ruta del proxy de imágenes a /image; el proxy inverso incluido almacena en caché la nueva ruta.
- Actualiza start-sdk a 3.0.6. Las credenciales de Gestionar acceso se pueden copiar y no se ofrecen como enlaces para abrir.

Cambios completos del proyecto original: https://github.com/searxng/searxng/compare/a9d990033...b00212a83`,
    de_DE: `SearXNG wurde auf 2026.10.15 aktualisiert.

- Behebt Suchprobleme mit Dogpile, PrivacyWall, Wikidata und XPrivo; ergänzt Vorschläge für S1Search.
- Vereinfacht die DOI-Resolver-Einstellungen, priorisiert Infoboxen mit Bildern und übersetzt die Hilfe zu Tastenkürzeln.
- Ändert den Bildproxy-Endpunkt zu /image; der mitgelieferte Reverse-Proxy speichert den neuen Pfad zwischen.
- Aktualisiert start-sdk auf 3.0.6. Die Zugangsdaten unter „Zugriff verwalten“ bleiben kopierbar und werden nicht als Links zum Öffnen angeboten.

Vollständige Änderungen des Upstream-Projekts: https://github.com/searxng/searxng/compare/a9d990033...b00212a83`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.10.15.

- Naprawiono wyszukiwanie w Dogpile, PrivacyWall, Wikidata i XPrivo; dodano podpowiedzi dla S1Search.
- Uproszczono preferencje usługi rozwiązywania DOI, nadano pierwszeństwo panelom informacyjnym z obrazami i przetłumaczono pomoc dotyczącą skrótów klawiaturowych.
- Zmieniono ścieżkę proxy obrazów na /image; dołączone odwrotne proxy buforuje nową ścieżkę.
- Zaktualizowano start-sdk do wersji 3.0.6. Dane logowania w „Zarządzaj dostępem” nadal można kopiować i nie są oferowane jako odnośniki do otwarcia.

Pełna lista zmian projektu nadrzędnego: https://github.com/searxng/searxng/compare/a9d990033...b00212a83`,
    fr_FR: `SearXNG a été mis à jour vers la version 2026.10.15.

- Corrige les recherches avec Dogpile, PrivacyWall, Wikidata et XPrivo ; ajoute les suggestions pour S1Search.
- Simplifie les préférences du résolveur DOI, donne la priorité aux encadrés avec images et traduit l’aide des raccourcis clavier.
- Renomme le point d’accès du proxy d’images en /image ; le proxy inverse intégré met en cache ce nouveau chemin.
- Met à jour start-sdk vers la version 3.0.6. Les identifiants de Gérer l’accès restent copiables et ne sont pas proposés comme liens à ouvrir.

Modifications complètes du projet en amont : https://github.com/searxng/searxng/compare/a9d990033...b00212a83`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
