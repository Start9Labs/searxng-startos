import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.19:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.9.19.

- Improves compatibility across Yandex Images, MediathekViewWeb, Giphy, 500px, FindFiles, Pixabay, TuskSearch, and Brave searches.
- Restores compressed SVGs and similar images served through the image proxy.
- Automatically solves supported anti-bot challenges for Mojeek and Magnific searches.
- Adds the LittleLayer search engine and dedicated categories for stock images and apps.
- Removes the Library of Congress engine because its searches are now blocked by Cloudflare.

Complete upstream changes: https://github.com/searxng/searxng/compare/ca4965040...e831fc2a1`,
    es_ES: `Se actualizó SearXNG a 2026.9.19.

- Mejora la compatibilidad de las búsquedas de Yandex Images, MediathekViewWeb, Giphy, 500px, FindFiles, Pixabay, TuskSearch y Brave.
- Restaura los SVG comprimidos y otras imágenes similares servidas mediante el proxy de imágenes.
- Resuelve automáticamente los desafíos antibot compatibles de las búsquedas de Mojeek y Magnific.
- Añade el motor de búsqueda LittleLayer y categorías específicas para imágenes de archivo y aplicaciones.
- Elimina el motor de la Biblioteca del Congreso porque Cloudflare ahora bloquea sus búsquedas.

Cambios completos del proyecto original: https://github.com/searxng/searxng/compare/ca4965040...e831fc2a1`,
    de_DE: `SearXNG wurde auf 2026.9.19 aktualisiert.

- Verbessert die Kompatibilität der Suche mit Yandex Images, MediathekViewWeb, Giphy, 500px, FindFiles, Pixabay, TuskSearch und Brave.
- Stellt komprimierte SVGs und ähnliche Bilder über den Bild-Proxy wieder korrekt bereit.
- Löst unterstützte Anti-Bot-Abfragen für Mojeek- und Magnific-Suchen automatisch.
- Fügt die Suchmaschine LittleLayer sowie eigene Kategorien für Stockbilder und Apps hinzu.
- Entfernt die Suchmaschine der Library of Congress, da deren Suchen jetzt von Cloudflare blockiert werden.

Vollständige Änderungen des Upstream-Projekts: https://github.com/searxng/searxng/compare/ca4965040...e831fc2a1`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.9.19.

- Poprawiono zgodność wyszukiwania w Yandex Images, MediathekViewWeb, Giphy, 500px, FindFiles, Pixabay, TuskSearch i Brave.
- Przywrócono obsługę skompresowanych plików SVG i podobnych obrazów przekazywanych przez serwer proxy obrazów.
- Automatycznie rozwiązuje obsługiwane zabezpieczenia antybotowe dla wyszukiwarek Mojeek i Magnific.
- Dodaje wyszukiwarkę LittleLayer oraz osobne kategorie dla obrazów stockowych i aplikacji.
- Usuwa wyszukiwarkę Library of Congress, ponieważ jej wyszukiwania są teraz blokowane przez Cloudflare.

Pełna lista zmian projektu nadrzędnego: https://github.com/searxng/searxng/compare/ca4965040...e831fc2a1`,
    fr_FR: `SearXNG a été mis à jour vers la version 2026.9.19.

- Améliore la compatibilité des recherches Yandex Images, MediathekViewWeb, Giphy, 500px, FindFiles, Pixabay, TuskSearch et Brave.
- Rétablit les fichiers SVG compressés et les images similaires servis par le proxy d'images.
- Résout automatiquement les défis antibots pris en charge pour les recherches Mojeek et Magnific.
- Ajoute le moteur de recherche LittleLayer et des catégories dédiées aux images de stock et aux applications.
- Supprime le moteur de la Bibliothèque du Congrès, car ses recherches sont désormais bloquées par Cloudflare.

Modifications complètes du projet en amont : https://github.com/searxng/searxng/compare/ca4965040...e831fc2a1`,
  },
  migrations: {},
})
