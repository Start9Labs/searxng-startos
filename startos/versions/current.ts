import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.7.28:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.7.28.

- Adds the Exa Search API engine. It is off by default and only works with your own Exa API key.
- Refreshed interface translations.
- Routine dependency and build maintenance, plus a container fix for invalid port settings that StartOS does not use.

Full upstream changes: https://github.com/searxng/searxng/compare/6da6eee26...c01178d03`,
    es_ES: `SearXNG actualizado a 2026.7.28.

- Añade el motor Exa Search API. Está desactivado de forma predeterminada y solo funciona con tu propia clave de API de Exa.
- Traducciones de la interfaz actualizadas.
- Mantenimiento rutinario de dependencias y del sistema de compilación, además de una corrección del contenedor para ajustes de puerto no válidos que StartOS no utiliza.

Todos los cambios originales: https://github.com/searxng/searxng/compare/6da6eee26...c01178d03`,
    de_DE: `SearXNG auf 2026.7.28 aktualisiert.

- Ergänzt die Suchmaschine Exa Search API. Sie ist standardmäßig deaktiviert und funktioniert nur mit einem eigenen Exa-API-Schlüssel.
- Aktualisierte Übersetzungen der Oberfläche.
- Routinemäßige Wartung von Abhängigkeiten und Build-System sowie eine Container-Korrektur für ungültige Port-Einstellungen, die StartOS nicht verwendet.

Alle Änderungen im Originalprojekt: https://github.com/searxng/searxng/compare/6da6eee26...c01178d03`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.7.28.

- Dodano wyszukiwarkę Exa Search API. Jest domyślnie wyłączona i działa wyłącznie z własnym kluczem API Exa.
- Odświeżone tłumaczenia interfejsu.
- Rutynowa aktualizacja zależności i systemu budowania oraz poprawka kontenera dotycząca nieprawidłowych ustawień portu, których StartOS nie używa.

Pełna lista zmian w projekcie źródłowym: https://github.com/searxng/searxng/compare/6da6eee26...c01178d03`,
    fr_FR: `SearXNG mis à jour vers 2026.7.28.

- Ajoute le moteur Exa Search API. Il est désactivé par défaut et ne fonctionne qu'avec votre propre clé d'API Exa.
- Traductions de l'interface actualisées.
- Maintenance de routine des dépendances et du système de compilation, ainsi qu'un correctif du conteneur pour les réglages de port invalides que StartOS n'utilise pas.

Ensemble des modifications en amont : https://github.com/searxng/searxng/compare/6da6eee26...c01178d03`,
  },
  migrations: {},
})
