import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.12:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.9.12.

- Fixes Bing web searches that could use only the first word of multi-word queries and improves locale handling.
- Improves Bing Images compatibility and missing-title handling, and fixes empty or uninformative titles in Pinterest image results.
- Fixes Dogpile web searches by supplying the required API token.

Complete upstream changes: https://github.com/searxng/searxng/compare/931fd9787...56b1f6454`,
    es_ES: `Se actualizó SearXNG a 2026.9.12.

- Corrige las búsquedas web de Bing que podían usar solo la primera palabra de consultas de varias palabras y mejora la selección de idioma y país.
- Mejora la compatibilidad de Bing Imágenes y el tratamiento de títulos ausentes, y corrige los títulos vacíos o poco informativos en los resultados de imágenes de Pinterest.
- Corrige las búsquedas web de Dogpile al proporcionar el token de API requerido.

Cambios completos del proyecto original: https://github.com/searxng/searxng/compare/931fd9787...56b1f6454`,
    de_DE: `SearXNG wurde auf 2026.9.12 aktualisiert.

- Behebt Bing-Websuchen, die bei Suchanfragen aus mehreren Wörtern nur das erste Wort verwenden konnten, und verbessert die Auswahl von Sprache und Land.
- Verbessert die Kompatibilität von Bing Bilder und den Umgang mit fehlenden Titeln und behebt leere oder wenig aussagekräftige Titel in Pinterest-Bildergebnissen.
- Behebt Dogpile-Websuchen durch Übermittlung des erforderlichen API-Tokens.

Vollständige Änderungen des Upstream-Projekts: https://github.com/searxng/searxng/compare/931fd9787...56b1f6454`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.9.12.

- Naprawiono wyszukiwania internetowe Bing, które mogły używać tylko pierwszego słowa wielowyrazowych zapytań, oraz ulepszono wybór języka i kraju.
- Ulepszono zgodność wyszukiwarki Bing Images i obsługę brakujących tytułów oraz naprawiono puste lub mało informacyjne tytuły w wynikach wyszukiwania obrazów Pinterest.
- Naprawiono wyszukiwanie internetowe Dogpile przez przekazywanie wymaganego tokenu API.

Pełna lista zmian projektu nadrzędnego: https://github.com/searxng/searxng/compare/931fd9787...56b1f6454`,
    fr_FR: `SearXNG a été mis à jour vers la version 2026.9.12.

- Corrige les recherches web Bing qui pouvaient n'utiliser que le premier mot des requêtes comportant plusieurs mots et améliore la sélection de la langue et du pays.
- Améliore la compatibilité de Bing Images et la gestion des titres manquants, et corrige les titres vides ou peu informatifs dans les résultats d'images Pinterest.
- Corrige les recherches web Dogpile en fournissant le jeton d'API requis.

Modifications complètes du projet en amont : https://github.com/searxng/searxng/compare/931fd9787...56b1f6454`,
  },
  migrations: {},
})
