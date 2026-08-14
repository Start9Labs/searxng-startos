import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.8.16:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.8.16.

A small maintenance release: it adds Yandex Search API as an optional general search engine, inactive by default and requiring your own Yandex API key. Everything else in this range is dependency and build-tooling updates.

Full upstream changes: https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
    es_ES: `SearXNG actualizado a 2026.8.16.

Una pequeña versión de mantenimiento: añade la API de búsqueda de Yandex como motor de búsqueda general opcional, inactivo de forma predeterminada y que requiere tu propia clave de API de Yandex. El resto de los cambios de este rango son actualizaciones de dependencias y de herramientas de compilación.

Todos los cambios originales: https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
    de_DE: `SearXNG auf 2026.8.16 aktualisiert.

Eine kleine Wartungsversion: Sie ergänzt die Yandex-Such-API als optionale allgemeine Suchmaschine, die standardmäßig inaktiv ist und einen eigenen Yandex-API-Schlüssel erfordert. Alle übrigen Änderungen in diesem Bereich sind Aktualisierungen von Abhängigkeiten und Build-Werkzeugen.

Alle Änderungen im Originalprojekt: https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.8.16.

Niewielka aktualizacja konserwacyjna: dodaje API wyszukiwania Yandex jako opcjonalną ogólną wyszukiwarkę, domyślnie nieaktywną i wymagającą własnego klucza API Yandex. Pozostałe zmiany w tym zakresie to aktualizacje zależności i narzędzi kompilacji.

Pełna lista zmian w projekcie źródłowym: https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
    fr_FR: `SearXNG mis à jour vers 2026.8.16.

Une petite version de maintenance : elle ajoute l'API de recherche Yandex comme moteur de recherche généraliste optionnel, inactif par défaut et nécessitant votre propre clé d'API Yandex. Le reste des modifications de cette plage concerne des mises à jour de dépendances et de l'outillage de compilation.

Ensemble des modifications en amont : https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
  },
  migrations: {},
})
