import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.10:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.9.10.

- Adds SearchRockit for general, news, and image searches, plus Europe PMC for life-science publications.
- Improves outbound requests and compatibility with DuckDuckGo and Startpage anti-bot challenges.
- Fixes compatibility across Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir, Marginalia, and CORE.ac.uk. Brave API searches now explicitly request JSON responses.
- Startpage search is now inactive by default because its challenge can require CPU-intensive proof-of-work.
- Removes the Cara engine because it now requires an account, and removes the disabled legacy SearX engine.

Complete upstream changes: https://github.com/searxng/searxng/compare/15b0c8ef3...931fd9787`,
    es_ES: `Se actualizó SearXNG a 2026.9.10.

- Añade SearchRockit para búsquedas generales, de noticias y de imágenes, además de Europe PMC para publicaciones de ciencias de la vida.
- Mejora las solicitudes salientes y la compatibilidad con los desafíos antibot de DuckDuckGo y Startpage.
- Corrige la compatibilidad con Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir, Marginalia y CORE.ac.uk. Las búsquedas de la API de Brave ahora solicitan explícitamente respuestas JSON.
- La búsqueda de Startpage ahora está inactiva de forma predeterminada porque su desafío puede requerir una prueba de trabajo que consume muchos recursos de CPU.
- Elimina el motor Cara porque ahora requiere una cuenta y elimina el motor SearX heredado que estaba desactivado.

Cambios completos del proyecto original: https://github.com/searxng/searxng/compare/15b0c8ef3...931fd9787`,
    de_DE: `SearXNG wurde auf 2026.9.10 aktualisiert.

- Fügt SearchRockit für allgemeine Suchen sowie Nachrichten- und Bildsuchen und Europe PMC für biowissenschaftliche Veröffentlichungen hinzu.
- Verbessert ausgehende Anfragen und die Kompatibilität mit den Anti-Bot-Abfragen von DuckDuckGo und Startpage.
- Behebt Kompatibilitätsprobleme mit Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir, Marginalia und CORE.ac.uk. Brave-API-Suchen fordern nun ausdrücklich JSON-Antworten an.
- Die Startpage-Suche ist jetzt standardmäßig inaktiv, da ihre Abfrage eine rechenintensive Arbeitsnachweisberechnung erfordern kann.
- Entfernt die Cara-Suchmaschine, da sie jetzt ein Konto erfordert, sowie die deaktivierte veraltete SearX-Suchmaschine.

Vollständige Änderungen des Upstream-Projekts: https://github.com/searxng/searxng/compare/15b0c8ef3...931fd9787`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.9.10.

- Dodano SearchRockit do wyszukiwania ogólnego, wiadomości i obrazów oraz Europe PMC do wyszukiwania publikacji z dziedziny nauk przyrodniczych.
- Ulepszono żądania wychodzące i zgodność z zabezpieczeniami antybotowymi DuckDuckGo i Startpage.
- Naprawiono zgodność z Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir, Marginalia i CORE.ac.uk. Wyszukiwania przez API Brave teraz jawnie żądają odpowiedzi JSON.
- Wyszukiwarka Startpage jest teraz domyślnie nieaktywna, ponieważ jej zabezpieczenie może wymagać obciążającego procesor dowodu pracy.
- Usunięto wyszukiwarkę Cara, ponieważ teraz wymaga konta, oraz nieaktywną przestarzałą wyszukiwarkę SearX.

Pełna lista zmian projektu nadrzędnego: https://github.com/searxng/searxng/compare/15b0c8ef3...931fd9787`,
    fr_FR: `SearXNG a été mis à jour vers la version 2026.9.10.

- Ajoute SearchRockit pour les recherches générales, d'actualités et d'images, ainsi qu'Europe PMC pour les publications en sciences de la vie.
- Améliore les requêtes sortantes et la compatibilité avec les défis antibots de DuckDuckGo et Startpage.
- Corrige la compatibilité avec Brave, SearchZee, NeoSearch, Dogpile, TuskSearch, ResultHunter, ChatNoir, Marginalia et CORE.ac.uk. Les recherches via l'API Brave demandent désormais explicitement des réponses JSON.
- La recherche Startpage est désormais inactive par défaut, car son défi peut nécessiter une preuve de travail gourmande en ressources processeur.
- Supprime le moteur Cara, qui nécessite désormais un compte, ainsi que l'ancien moteur SearX désactivé.

Modifications complètes du projet en amont : https://github.com/searxng/searxng/compare/15b0c8ef3...931fd9787`,
  },
  migrations: {},
})
