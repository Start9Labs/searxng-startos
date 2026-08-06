import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.8.3:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.8.3.

- Fixes search autocomplete: suggestions no longer show raw HTML escape codes, and requests use GET again.
- Removes the Reddit engine, which now requires authentication upstream, and the Presearch engine.
- Adds the Keenable general search engine.
- Adds Kagi as an optional favicon resolver.
- Refreshed search data: engine capabilities, currencies, and the Ahmia blacklist.

Full upstream changes: https://github.com/searxng/searxng/compare/c01178d03...aa059419f`,
    es_ES: `SearXNG actualizado a 2026.8.3.

- Corrige el autocompletado de búsqueda: las sugerencias ya no muestran códigos de escape HTML y las peticiones vuelven a usar GET.
- Elimina el motor Reddit, que ahora requiere autenticación en el proyecto original, y el motor Presearch.
- Añade el motor de búsqueda general Keenable.
- Añade Kagi como resolutor opcional de favicons.
- Datos de búsqueda actualizados: capacidades de los motores, monedas y la lista negra de Ahmia.

Todos los cambios originales: https://github.com/searxng/searxng/compare/c01178d03...aa059419f`,
    de_DE: `SearXNG auf 2026.8.3 aktualisiert.

- Behebt die Suchvervollständigung: Vorschläge zeigen keine HTML-Escape-Codes mehr, und Anfragen verwenden wieder GET.
- Entfernt die Suchmaschine Reddit, die im Originalprojekt nun eine Anmeldung erfordert, sowie die Suchmaschine Presearch.
- Ergänzt die allgemeine Suchmaschine Keenable.
- Ergänzt Kagi als optionalen Favicon-Resolver.
- Aktualisierte Suchdaten: Funktionen der Suchmaschinen, Währungen und die Ahmia-Sperrliste.

Alle Änderungen im Originalprojekt: https://github.com/searxng/searxng/compare/c01178d03...aa059419f`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.8.3.

- Poprawiono autouzupełnianie wyszukiwania: podpowiedzi nie zawierają już kodów HTML, a żądania ponownie używają metody GET.
- Usunięto wyszukiwarkę Reddit, która w projekcie źródłowym wymaga teraz uwierzytelniania, oraz wyszukiwarkę Presearch.
- Dodano ogólną wyszukiwarkę Keenable.
- Dodano Kagi jako opcjonalne źródło ikon favicon.
- Odświeżone dane wyszukiwania: możliwości wyszukiwarek, waluty i czarna lista Ahmia.

Pełna lista zmian w projekcie źródłowym: https://github.com/searxng/searxng/compare/c01178d03...aa059419f`,
    fr_FR: `SearXNG mis à jour vers 2026.8.3.

- Corrige l'autocomplétion : les suggestions n'affichent plus de codes d'échappement HTML et les requêtes utilisent de nouveau GET.
- Supprime le moteur Reddit, qui exige désormais une authentification en amont, ainsi que le moteur Presearch.
- Ajoute le moteur de recherche généraliste Keenable.
- Ajoute Kagi comme résolveur de favicons optionnel.
- Données de recherche actualisées : capacités des moteurs, devises et liste noire Ahmia.

Ensemble des modifications en amont : https://github.com/searxng/searxng/compare/c01178d03...aa059419f`,
  },
  migrations: {},
})
