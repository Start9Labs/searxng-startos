import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.8.16:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.8.16.

- Adds Yandex as a general search engine. It uses Yandex's paid search API, so it needs an API key and stays off until you configure one.
- Updated the web client and Python dependencies.

Full upstream changes: https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
    es_ES: `SearXNG actualizado a 2026.8.16.

- Añade Yandex como motor de búsqueda general. Usa la API de búsqueda de pago de Yandex, así que necesita una clave de API y permanece desactivado hasta que configures una.
- Se actualizaron el cliente web y las dependencias de Python.

Todos los cambios originales: https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
    de_DE: `SearXNG auf 2026.8.16 aktualisiert.

- Ergänzt Yandex als allgemeine Suchmaschine. Sie nutzt die kostenpflichtige Such-API von Yandex, benötigt also einen API-Schlüssel und bleibt deaktiviert, bis du einen hinterlegst.
- Web-Client und Python-Abhängigkeiten aktualisiert.

Alle Änderungen im Originalprojekt: https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.8.16.

- Dodano Yandex jako ogólną wyszukiwarkę. Korzysta z płatnego API wyszukiwania Yandex, więc wymaga klucza API i pozostaje wyłączona, dopóki go nie skonfigurujesz.
- Zaktualizowano klienta webowego i zależności Pythona.

Pełna lista zmian w projekcie źródłowym: https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
    fr_FR: `SearXNG mis à jour vers 2026.8.16.

- Ajoute Yandex comme moteur de recherche généraliste. Il s'appuie sur l'API de recherche payante de Yandex : une clé d'API est nécessaire et il reste désactivé tant que vous n'en configurez pas une.
- Client web et dépendances Python mis à jour.

Ensemble des modifications en amont : https://github.com/searxng/searxng/compare/cdfdaa5a8...b2da6b90f`,
  },
  migrations: {},
})
