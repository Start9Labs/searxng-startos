import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.7.24:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.7.24.

A minor maintenance release. SearXNG ships rolling releases without individual changelogs; only two commits landed upstream since 2026.7.19:

- The container now ignores invalid SEARXNG_PORT values instead of failing to start.
- Internal continuous-integration dependency refresh.

Full upstream changes: https://github.com/searxng/searxng/compare/6da6eee26...4f64d9501`,
    es_ES: `Actualiza SearXNG a 2026.7.24.

Una versión de mantenimiento menor. SearXNG publica versiones continuas sin registros de cambios individuales; solo se incorporaron dos commits desde la 2026.7.19:

- El contenedor ahora ignora los valores no válidos de SEARXNG_PORT en lugar de no iniciarse.
- Actualización interna de una dependencia de integración continua.

Cambios completos: https://github.com/searxng/searxng/compare/6da6eee26...4f64d9501`,
    de_DE: `Aktualisiert SearXNG auf 2026.7.24.

Eine kleine Wartungsversion. SearXNG veröffentlicht fortlaufende Versionen ohne einzelne Änderungsprotokolle; seit 2026.7.19 sind nur zwei Commits hinzugekommen:

- Der Container ignoriert nun ungültige SEARXNG_PORT-Werte, anstatt nicht zu starten.
- Interne Aktualisierung einer Continuous-Integration-Abhängigkeit.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/6da6eee26...4f64d9501`,
    pl_PL: `Aktualizuje SearXNG do 2026.7.24.

Drobna aktualizacja konserwacyjna. SearXNG publikuje wydania ciągłe bez osobnych list zmian; od wersji 2026.7.19 pojawiły się tylko dwa commity:

- Kontener ignoruje teraz nieprawidłowe wartości SEARXNG_PORT zamiast nie uruchamiać się.
- Wewnętrzna aktualizacja zależności integracji ciągłej.

Pełne zmiany: https://github.com/searxng/searxng/compare/6da6eee26...4f64d9501`,
    fr_FR: `Met à jour SearXNG vers 2026.7.24.

Une version de maintenance mineure. SearXNG publie des versions en continu sans journal des modifications individuel ; seuls deux commits ont été ajoutés depuis la 2026.7.19 :

- Le conteneur ignore désormais les valeurs SEARXNG_PORT non valides au lieu de ne pas démarrer.
- Actualisation interne d'une dépendance d'intégration continue.

Changements complets : https://github.com/searxng/searxng/compare/6da6eee26...4f64d9501`,
  },
  migrations: {},
})
