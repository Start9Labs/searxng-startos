import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.15:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.9.15.

- Fixes search compatibility across Yahoo, Bing web and images, Dogpile, 500px, Naver Images, Pinterest, Public Domain Image Archive, and Flaticon searches containing non-ASCII characters.
- Enriches Openverse image results with thumbnails, resolution, and author information; Openverse is now disabled by default because its upstream service is unreliable.
- Improves the interface when JavaScript is disabled and limits excessively long result titles and descriptions.
- Removes the Adobe Stock engines because their searches are blocked by a captcha.
- Updates Python formatting tooling and the container build pipeline.

Complete upstream changes: https://github.com/searxng/searxng/compare/931fd9787...ca4965040`,
    es_ES: `Se actualizó SearXNG a 2026.9.15.

- Corrige la compatibilidad de búsqueda con Yahoo, Bing web e imágenes, Dogpile, 500px, Naver Images, Pinterest, Public Domain Image Archive y las búsquedas de Flaticon que contienen caracteres no ASCII.
- Enriquece los resultados de imágenes de Openverse con miniaturas, resolución e información del autor; Openverse ahora está desactivado de forma predeterminada porque su servicio original no es fiable.
- Mejora la interfaz cuando JavaScript está desactivado y limita los títulos y las descripciones excesivamente largos.
- Elimina los motores de Adobe Stock porque sus búsquedas están bloqueadas por un captcha.
- Actualiza las herramientas de formato de Python y el proceso de compilación del contenedor.

Cambios completos del proyecto original: https://github.com/searxng/searxng/compare/931fd9787...ca4965040`,
    de_DE: `SearXNG wurde auf 2026.9.15 aktualisiert.

- Behebt Kompatibilitätsprobleme bei Yahoo, der Web- und Bildersuche von Bing sowie bei Dogpile, 500px, Naver Images, Pinterest, Public Domain Image Archive und Flaticon-Suchen mit Nicht-ASCII-Zeichen.
- Ergänzt Openverse-Bildergebnisse um Vorschaubilder, Auflösung und Autoreninformationen; Openverse ist jetzt standardmäßig deaktiviert, weil der Upstream-Dienst unzuverlässig ist.
- Verbessert die Benutzeroberfläche bei deaktiviertem JavaScript und begrenzt übermäßig lange Titel und Beschreibungen.
- Entfernt die Adobe-Stock-Suchmaschinen, da ihre Suchen durch ein Captcha blockiert werden.
- Aktualisiert die Python-Formatierungswerkzeuge und die Container-Build-Pipeline.

Vollständige Änderungen des Upstream-Projekts: https://github.com/searxng/searxng/compare/931fd9787...ca4965040`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.9.15.

- Naprawiono zgodność wyszukiwania w Yahoo, wyszukiwania internetowego i obrazów Bing oraz wyszukiwarek Dogpile, 500px, Naver Images, Pinterest, Public Domain Image Archive i zapytań Flaticon zawierających znaki spoza ASCII.
- Rozszerzono wyniki wyszukiwania obrazów Openverse o miniatury, rozdzielczość i informacje o autorze; Openverse jest teraz domyślnie wyłączony z powodu zawodności usługi nadrzędnej.
- Ulepszono interfejs przy wyłączonej obsłudze JavaScript i ograniczono nadmiernie długie tytuły oraz opisy.
- Usunięto wyszukiwarki Adobe Stock, ponieważ ich wyszukiwanie jest blokowane przez captcha.
- Zaktualizowano narzędzia formatowania kodu Python i proces budowania kontenera.

Pełna lista zmian projektu nadrzędnego: https://github.com/searxng/searxng/compare/931fd9787...ca4965040`,
    fr_FR: `SearXNG a été mis à jour vers la version 2026.9.15.

- Corrige la compatibilité des recherches Yahoo, des recherches web et d'images de Bing, ainsi que de Dogpile, 500px, Naver Images, Pinterest, Public Domain Image Archive et des recherches Flaticon contenant des caractères non ASCII.
- Enrichit les résultats d'images Openverse avec des miniatures, la résolution et les informations sur l'auteur ; Openverse est désormais désactivé par défaut, car son service en amont n'est pas fiable.
- Améliore l'interface lorsque JavaScript est désactivé et limite les titres et descriptions excessivement longs.
- Supprime les moteurs Adobe Stock, car leurs recherches sont bloquées par un captcha.
- Met à jour les outils de formatage Python et la chaîne de construction du conteneur.

Modifications complètes du projet en amont : https://github.com/searxng/searxng/compare/931fd9787...ca4965040`,
  },
  migrations: {},
})
