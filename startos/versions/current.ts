import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.7.19:1',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.7.19.

SearXNG ships rolling releases without individual changelogs; this bump picks up engine and dependency updates published since 2026.7.13.

This release also migrates the package to start-sdk 2.0 (requires StartOS 0.4.0-beta.10 or later).`,
    es_ES: `Actualiza SearXNG a 2026.7.19.

SearXNG publica versiones continuas sin registros de cambios individuales; esta actualización incorpora las mejoras de motores y dependencias publicadas desde la 2026.7.13.

Esta versión también migra el paquete a start-sdk 2.0 (requiere StartOS 0.4.0-beta.10 o posterior).`,
    de_DE: `Aktualisiert SearXNG auf 2026.7.19.

SearXNG veröffentlicht fortlaufende Versionen ohne einzelne Änderungsprotokolle; diese Aktualisierung übernimmt die seit 2026.7.13 veröffentlichten Engine- und Abhängigkeitsaktualisierungen.

Diese Version stellt das Paket außerdem auf start-sdk 2.0 um (erfordert StartOS 0.4.0-beta.10 oder neuer).`,
    pl_PL: `Aktualizuje SearXNG do 2026.7.19.

SearXNG publikuje wydania ciągłe bez osobnych list zmian; ta aktualizacja obejmuje zmiany silników i zależności opublikowane od wersji 2026.7.13.

Ta wersja przenosi też pakiet na start-sdk 2.0 (wymaga StartOS 0.4.0-beta.10 lub nowszego).`,
    fr_FR: `Met à jour SearXNG vers 2026.7.19.

SearXNG publie des versions en continu sans journal des modifications individuel ; cette mise à jour intègre les évolutions des moteurs et des dépendances publiées depuis la 2026.7.13.

Cette version fait également passer le paquet à start-sdk 2.0 (nécessite StartOS 0.4.0-beta.10 ou une version ultérieure).`,
  },
  migrations: {},
})
