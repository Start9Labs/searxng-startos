import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.8.4:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.8.4.

A small maintenance release:

- Adds Kagi as an option for search autocomplete suggestions, selectable under Preferences.
- Refreshed the unit data used to convert measurements in answers.

Full upstream changes: https://github.com/searxng/searxng/compare/aa059419f...c63835bd2`,
    es_ES: `SearXNG actualizado a 2026.8.4.

Una pequeña versión de mantenimiento:

- Añade Kagi como opción para las sugerencias de autocompletado, seleccionable en Preferencias.
- Datos de unidades actualizados para convertir medidas en las respuestas.

Todos los cambios originales: https://github.com/searxng/searxng/compare/aa059419f...c63835bd2`,
    de_DE: `SearXNG auf 2026.8.4 aktualisiert.

Eine kleine Wartungsversion:

- Ergänzt Kagi als Option für die Suchvervollständigung, auswählbar unter Einstellungen.
- Aktualisierte Einheitendaten für die Umrechnung von Maßangaben in Antworten.

Alle Änderungen im Originalprojekt: https://github.com/searxng/searxng/compare/aa059419f...c63835bd2`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.8.4.

Niewielkie wydanie konserwacyjne:

- Dodano Kagi jako źródło podpowiedzi autouzupełniania, do wyboru w Preferencjach.
- Odświeżono dane jednostek używane do przeliczania miar w odpowiedziach.

Pełna lista zmian w projekcie źródłowym: https://github.com/searxng/searxng/compare/aa059419f...c63835bd2`,
    fr_FR: `SearXNG mis à jour vers 2026.8.4.

Une petite version de maintenance :

- Ajoute Kagi comme source de suggestions d'autocomplétion, sélectionnable dans les Préférences.
- Données d'unités actualisées pour la conversion des mesures dans les réponses.

Ensemble des modifications en amont : https://github.com/searxng/searxng/compare/aa059419f...c63835bd2`,
  },
  migrations: {},
})
