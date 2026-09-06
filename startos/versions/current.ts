import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.5:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.9.5.

- Adds SearchRockit for general, news, and image searches.
- Improves outbound requests with a new networking implementation.
- Fixes compatibility across Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir, and Marginalia. The Cara engine was removed because it now requires an account.

Complete upstream changes: https://github.com/searxng/searxng/compare/15b0c8ef3...c7f3080aa`,
    es_ES: `Se actualizó SearXNG a 2026.9.5.

- Añade SearchRockit para búsquedas generales, de noticias y de imágenes.
- Mejora las solicitudes salientes con una nueva implementación de red.
- Corrige la compatibilidad con Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir y Marginalia. Se eliminó el motor Cara porque ahora requiere una cuenta.

Cambios completos del proyecto original: https://github.com/searxng/searxng/compare/15b0c8ef3...c7f3080aa`,
    de_DE: `SearXNG wurde auf 2026.9.5 aktualisiert.

- Fügt SearchRockit für allgemeine Suchen sowie Nachrichten- und Bildsuchen hinzu.
- Verbessert ausgehende Anfragen durch eine neue Netzwerkimplementierung.
- Behebt Kompatibilitätsprobleme mit Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir und Marginalia. Die Cara-Suchmaschine wurde entfernt, da sie jetzt ein Konto erfordert.

Vollständige Änderungen des Upstream-Projekts: https://github.com/searxng/searxng/compare/15b0c8ef3...c7f3080aa`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.9.5.

- Dodano SearchRockit do wyszukiwania ogólnego, wiadomości i obrazów.
- Ulepszono żądania wychodzące dzięki nowej implementacji sieciowej.
- Naprawiono zgodność z Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir i Marginalia. Usunięto wyszukiwarkę Cara, ponieważ teraz wymaga konta.

Pełna lista zmian projektu nadrzędnego: https://github.com/searxng/searxng/compare/15b0c8ef3...c7f3080aa`,
    fr_FR: `SearXNG a été mis à jour vers la version 2026.9.5.

- Ajoute SearchRockit pour les recherches générales, d'actualités et d'images.
- Améliore les requêtes sortantes grâce à une nouvelle implémentation réseau.
- Corrige la compatibilité avec Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir et Marginalia. Le moteur Cara a été supprimé, car il nécessite désormais un compte.

Modifications complètes du projet en amont : https://github.com/searxng/searxng/compare/15b0c8ef3...c7f3080aa`,
  },
  migrations: {},
})
