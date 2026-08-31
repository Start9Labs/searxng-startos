import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.8.29:1',
  releaseNotes: {
    en_US: `Updated the bundled Valkey cache to version 9, and repaired the link between SearXNG and it.

SearXNG itself is unchanged.

- The cache moved onto Valkey 9, the major version the SearXNG project now recommends. It holds nothing that outlives a restart, so nothing is migrated.
- SearXNG was pointed at a cache address it could never reach, so it had been running with no cache behind it. It now reaches Valkey over the loopback address the two share.

What is new in Valkey 9: https://valkey.io/blog/introducing-valkey-9/`,
    es_ES: `Se actualizó la caché Valkey incluida a la versión 9 y se reparó el enlace entre SearXNG y ella.

SearXNG en sí no cambia.

- La caché pasó a Valkey 9, la versión principal que el proyecto SearXNG recomienda ahora. No guarda nada que sobreviva a un reinicio, así que no se migra nada.
- SearXNG apuntaba a una dirección de caché que nunca podía alcanzar, de modo que funcionaba sin caché detrás. Ahora llega a Valkey por la dirección de bucle local que ambos comparten.

Novedades de Valkey 9: https://valkey.io/blog/introducing-valkey-9/`,
    de_DE: `Der mitgelieferte Valkey-Cache wurde auf Version 9 aktualisiert und die Verbindung zwischen SearXNG und dem Cache repariert.

SearXNG selbst bleibt unverändert.

- Der Cache läuft jetzt auf Valkey 9, der Hauptversion, die das SearXNG-Projekt inzwischen empfiehlt. Er enthält nichts, was einen Neustart überdauert, es wird also nichts migriert.
- SearXNG war auf eine Cache-Adresse gerichtet, die es nie erreichen konnte, lief also ganz ohne Cache. Es erreicht Valkey jetzt über die Loopback-Adresse, die sich beide teilen.

Neuerungen in Valkey 9: https://valkey.io/blog/introducing-valkey-9/`,
    pl_PL: `Zaktualizowano dołączoną pamięć podręczną Valkey do wersji 9 i naprawiono połączenie między SearXNG a nią.

Sam SearXNG się nie zmienia.

- Pamięć podręczna przeszła na Valkey 9, wersję główną zalecaną obecnie przez projekt SearXNG. Nie przechowuje niczego, co przetrwa ponowne uruchomienie, więc nic nie jest migrowane.
- SearXNG wskazywał adres pamięci podręcznej, do którego nigdy nie mógł dotrzeć, więc działał w ogóle bez pamięci podręcznej. Teraz łączy się z Valkey przez adres pętli zwrotnej, który oba dzielą.

Nowości w Valkey 9: https://valkey.io/blog/introducing-valkey-9/`,
    fr_FR: `Le cache Valkey intégré a été mis à jour vers la version 9 et le lien entre SearXNG et lui a été réparé.

SearXNG lui-même ne change pas.

- Le cache est passé à Valkey 9, la version majeure que le projet SearXNG recommande désormais. Il ne conserve rien qui survive à un redémarrage, rien n'est donc migré.
- SearXNG pointait vers une adresse de cache qu'il ne pouvait jamais atteindre : il fonctionnait donc sans aucun cache. Il joint maintenant Valkey par l'adresse de bouclage que les deux partagent.

Nouveautés de Valkey 9 : https://valkey.io/blog/introducing-valkey-9/`,
  },
  migrations: {},
})
