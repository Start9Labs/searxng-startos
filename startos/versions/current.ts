import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.8.29:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.8.29.

**Security**

- Closed a cross-site scripting hole in the calculator answer box.
- Fixed the handling of client addresses behind a reverse proxy, where a client could mask its own IP address from the server.
- Capped how far a compressed preferences link is expanded, so an oversized one can no longer exhaust memory.

**Engines**

- The Google engines were repaired. Google Videos and Google News search out of the box, and Google and Google Images now appear in Preferences, switched off, so you can turn them on yourself.
- The DeviantArt image engine no longer works, because DeviantArt denies it access. Upstream withdrew it, so it has left the engine list.

**Other**

- Refreshed two bundled libraries.
- Refreshed the browser identity SearXNG presents when it queries search engines, the per-engine table of supported languages and regions, and the blocklist used by the Ahmia engine.

Full upstream changes: https://github.com/searxng/searxng/compare/b2da6b90f...d226b78bc`,
    es_ES: `SearXNG actualizado a 2026.8.29.

**Seguridad**

- Se cerró un fallo de secuencias de comandos entre sitios (XSS) en el cuadro de respuesta de la calculadora.
- Se corrigió el tratamiento de las direcciones de cliente detrás de un proxy inverso, donde un cliente podía ocultar su propia dirección IP al servidor.
- Se limitó cuánto se expande un enlace de preferencias comprimido, de modo que uno demasiado grande ya no puede agotar la memoria.

**Motores de búsqueda**

- Se repararon los motores de Google. Google Videos y Google News buscan de forma predeterminada, y Google y Google Imágenes aparecen ahora en Preferencias, desactivados, para que puedas activarlos tú.
- El motor de imágenes DeviantArt ya no funciona, porque DeviantArt le deniega el acceso. El proyecto original lo retiró, así que ha desaparecido de la lista de motores.

**Otros cambios**

- Se actualizaron dos bibliotecas incluidas.
- Se actualizó la identidad de navegador que SearXNG presenta al consultar los motores de búsqueda, la tabla de idiomas y regiones que admite cada motor, y la lista de bloqueo que usa el motor Ahmia.

Todos los cambios originales: https://github.com/searxng/searxng/compare/b2da6b90f...d226b78bc`,
    de_DE: `SearXNG auf 2026.8.29 aktualisiert.

**Sicherheit**

- Eine Cross-Site-Scripting-Lücke im Antwortfeld des Taschenrechners wurde geschlossen.
- Die Behandlung von Client-Adressen hinter einem Reverse-Proxy wurde korrigiert; ein Client konnte seine eigene IP-Adresse vor dem Server verbergen.
- Es wird jetzt begrenzt, wie weit ein komprimierter Einstellungs-Link entpackt wird, sodass ein übergroßer Link den Speicher nicht mehr erschöpfen kann.

**Suchmaschinen**

- Die Google-Suchmaschinen wurden repariert. Google Videos und Google News suchen standardmäßig mit, und Google sowie Google Bilder stehen jetzt in den Einstellungen bereit, aber ausgeschaltet, sodass du sie selbst aktivieren kannst.
- Die Bildersuchmaschine DeviantArt funktioniert nicht mehr, weil DeviantArt ihr den Zugriff verweigert. Das Originalprojekt hat sie zurückgezogen, sie ist daher aus der Liste der Suchmaschinen verschwunden.

**Sonstiges**

- Zwei mitgelieferte Bibliotheken wurden aufgefrischt.
- Aufgefrischt wurden außerdem die Browser-Kennung, mit der sich SearXNG bei Suchmaschinen meldet, die Tabelle der von jeder Suchmaschine unterstützten Sprachen und Regionen sowie die Sperrliste der Suchmaschine Ahmia.

Alle Änderungen im Originalprojekt: https://github.com/searxng/searxng/compare/b2da6b90f...d226b78bc`,
    pl_PL: `Zaktualizowano SearXNG do wersji 2026.8.29.

**Bezpieczeństwo**

- Usunięto lukę typu cross-site scripting (XSS) w polu odpowiedzi kalkulatora.
- Poprawiono obsługę adresów klientów za odwrotnym proxy, gdzie klient mógł ukryć własny adres IP przed serwerem.
- Ograniczono, jak bardzo rozpakowywany jest skompresowany link z preferencjami, dzięki czemu zbyt duży link nie wyczerpie już pamięci.

**Wyszukiwarki**

- Naprawiono wyszukiwarki Google. Google Videos i Google News wyszukują domyślnie, a Google i Google Grafika pojawiają się teraz w Preferencjach jako wyłączone, więc możesz je włączyć samodzielnie.
- Wyszukiwarka grafik DeviantArt przestała działać, ponieważ DeviantArt odmawia jej dostępu. Projekt źródłowy ją wycofał, więc zniknęła z listy wyszukiwarek.

**Pozostałe**

- Odświeżono dwie dołączone biblioteki.
- Odświeżono również tożsamość przeglądarki, którą SearXNG przedstawia wyszukiwarkom, tabelę języków i regionów obsługiwanych przez poszczególne wyszukiwarki oraz listę blokowanych stron używaną przez wyszukiwarkę Ahmia.

Pełna lista zmian w projekcie źródłowym: https://github.com/searxng/searxng/compare/b2da6b90f...d226b78bc`,
    fr_FR: `SearXNG mis à jour vers 2026.8.29.

**Sécurité**

- Une faille de script intersites (XSS) dans l'encadré de réponse de la calculatrice a été corrigée.
- Le traitement des adresses clientes derrière un proxy inverse a été corrigé : un client pouvait masquer sa propre adresse IP au serveur.
- L'expansion d'un lien de préférences compressé est désormais plafonnée, de sorte qu'un lien surdimensionné ne peut plus épuiser la mémoire.

**Moteurs de recherche**

- Les moteurs Google ont été réparés. Google Videos et Google News effectuent des recherches par défaut, et Google et Google Images figurent désormais dans les Préférences, désactivés, à vous de les activer.
- Le moteur d'images DeviantArt ne fonctionne plus, car DeviantArt lui refuse l'accès. Le projet amont l'a retiré, il a donc disparu de la liste des moteurs.

**Autres**

- Deux bibliothèques incluses ont été rafraîchies.
- Ont également été rafraîchies l'identité de navigateur que SearXNG présente aux moteurs de recherche, le tableau des langues et régions prises en charge par chaque moteur, et la liste de blocage utilisée par le moteur Ahmia.

Ensemble des modifications en amont : https://github.com/searxng/searxng/compare/b2da6b90f...d226b78bc`,
  },
  migrations: {},
})
