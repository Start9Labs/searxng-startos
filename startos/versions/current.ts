import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.4:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.9.4.

- Video results can now provide embedded playback links automatically.
- Wikidata results are more reliable because property data is bundled instead of fetched during startup.
- Fixes improve DuckDuckGo weather queries and the Brave API, ChatNoir, and Meilisearch engines.

Complete upstream changes: https://github.com/searxng/searxng/compare/d226b78bc...15b0c8ef3`,
    es_ES: `Se actualizó SearXNG a 2026.9.4.

- Los resultados de vídeo ahora pueden proporcionar automáticamente enlaces de reproducción integrados.
- Los resultados de Wikidata son más fiables porque los datos de propiedades vienen incluidos en lugar de obtenerse durante el arranque.
- Las correcciones mejoran las consultas meteorológicas de DuckDuckGo y los motores Brave API, ChatNoir y Meilisearch.

Cambios completos del proyecto original: https://github.com/searxng/searxng/compare/d226b78bc...15b0c8ef3`,
    de_DE: `SearXNG wurde auf 2026.9.4 aktualisiert.

- Videoergebnisse können jetzt automatisch eingebettete Wiedergabelinks bereitstellen.
- Wikidata-Ergebnisse sind zuverlässiger, da die Eigenschaftsdaten mitgeliefert und nicht beim Start abgerufen werden.
- Korrekturen verbessern DuckDuckGo-Wetteranfragen sowie die Brave-API-, ChatNoir- und Meilisearch-Suchmaschinen.

Vollständige Änderungen des Upstream-Projekts: https://github.com/searxng/searxng/compare/d226b78bc...15b0c8ef3`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.9.4.

- Wyniki wideo mogą teraz automatycznie udostępniać osadzone odnośniki do odtwarzania.
- Wyniki Wikidata są bardziej niezawodne, ponieważ dane właściwości są dołączone zamiast pobierane podczas uruchamiania.
- Poprawki usprawniają zapytania pogodowe DuckDuckGo oraz wyszukiwarki Brave API, ChatNoir i Meilisearch.

Pełna lista zmian projektu nadrzędnego: https://github.com/searxng/searxng/compare/d226b78bc...15b0c8ef3`,
    fr_FR: `SearXNG a été mis à jour vers la version 2026.9.4.

- Les résultats vidéo peuvent désormais fournir automatiquement des liens de lecture intégrés.
- Les résultats Wikidata sont plus fiables, car les données de propriétés sont intégrées au lieu d'être récupérées au démarrage.
- Des correctifs améliorent les requêtes météo DuckDuckGo ainsi que les moteurs Brave API, ChatNoir et Meilisearch.

Modifications complètes du projet en amont : https://github.com/searxng/searxng/compare/d226b78bc...15b0c8ef3`,
  },
  migrations: {},
})
