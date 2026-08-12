import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.8.12:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.8.12.

- Searches now use GET instead of POST by default, so the browser back button works and result pages can be bookmarked and shared.
- Autocomplete suggestions are now on by default, powered by DuckDuckGo.
- Adds Jina as a general search engine.
- Dogpile no longer fails with access-denied errors, but is now inactive by default.
- Updated Persian, Irish and Hebrew translations.

Full upstream changes: https://github.com/searxng/searxng/compare/c63835bd2...cdfdaa5a8`,
    es_ES: `SearXNG actualizado a 2026.8.12.

- Las búsquedas usan ahora GET en lugar de POST de forma predeterminada, por lo que el botón de retroceso del navegador funciona y las páginas de resultados se pueden guardar en marcadores y compartir.
- Las sugerencias de autocompletado están activadas de forma predeterminada, mediante DuckDuckGo.
- Añade Jina como motor de búsqueda general.
- Dogpile ya no falla con errores de acceso denegado, pero queda inactivo de forma predeterminada.
- Traducciones actualizadas al persa, irlandés y hebreo.

Todos los cambios originales: https://github.com/searxng/searxng/compare/c63835bd2...cdfdaa5a8`,
    de_DE: `SearXNG auf 2026.8.12 aktualisiert.

- Suchanfragen verwenden jetzt standardmäßig GET statt POST, sodass die Zurück-Schaltfläche des Browsers funktioniert und Ergebnisseiten als Lesezeichen gespeichert und geteilt werden können.
- Vorschläge zur Autovervollständigung sind jetzt standardmäßig aktiv und nutzen DuckDuckGo.
- Ergänzt Jina als allgemeine Suchmaschine.
- Dogpile scheitert nicht mehr an Zugriffsfehlern, ist aber jetzt standardmäßig inaktiv.
- Aktualisierte Übersetzungen für Persisch, Irisch und Hebräisch.

Alle Änderungen im Originalprojekt: https://github.com/searxng/searxng/compare/c63835bd2...cdfdaa5a8`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.8.12.

- Wyszukiwania domyślnie korzystają teraz z metody GET zamiast POST, dzięki czemu działa przycisk wstecz w przeglądarce, a strony wyników można dodawać do zakładek i udostępniać.
- Podpowiedzi autouzupełniania są domyślnie włączone i korzystają z DuckDuckGo.
- Dodano Jina jako ogólną wyszukiwarkę.
- Dogpile nie kończy się już błędami odmowy dostępu, ale jest domyślnie nieaktywny.
- Zaktualizowano tłumaczenia na perski, irlandzki i hebrajski.

Pełna lista zmian w projekcie źródłowym: https://github.com/searxng/searxng/compare/c63835bd2...cdfdaa5a8`,
    fr_FR: `SearXNG mis à jour vers 2026.8.12.

- Les recherches utilisent désormais GET plutôt que POST par défaut : le bouton retour du navigateur fonctionne et les pages de résultats peuvent être mises en favori et partagées.
- Les suggestions d'autocomplétion sont activées par défaut, via DuckDuckGo.
- Ajoute Jina comme moteur de recherche généraliste.
- Dogpile n'échoue plus avec des erreurs d'accès refusé, mais est désormais inactif par défaut.
- Traductions persane, irlandaise et hébraïque mises à jour.

Ensemble des modifications en amont : https://github.com/searxng/searxng/compare/c63835bd2...cdfdaa5a8`,
  },
  migrations: {},
})
