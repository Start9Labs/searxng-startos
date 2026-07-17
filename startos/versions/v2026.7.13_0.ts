import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const v_2026_7_13_0 = VersionInfo.of({
  version: '2026.7.13:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.7.13.

SearXNG ships as a rolling release and publishes no per-version changelog, so this is a snapshot of upstream development since 2026.6.30:

- Adds the Sina, Google CSE (including images), Neocities, and Kovunka search engines.
- Fixes Kagi results containing raw HTML tags and crashing when there are no results.
- Fixes a crash in the Google autocompleter, and strips HTML tags from Brave results.
- Shows a placeholder image when a result thumbnail fails to load.
- Updates translations and refreshes dependencies.

Upstream commits in this snapshot: https://github.com/searxng/searxng/compare/774616ada...9e25585ae`,
    es_ES: `Actualiza SearXNG a 2026.7.13.

SearXNG se publica como una versión continua y no ofrece un registro de cambios por versión, por lo que esto es una instantánea del desarrollo original desde 2026.6.30:

- Añade los motores de búsqueda Sina, Google CSE (incluidas imágenes), Neocities y Kovunka.
- Corrige los resultados de Kagi que contenían etiquetas HTML sin procesar y que fallaban cuando no había resultados.
- Corrige un fallo en el autocompletado de Google y elimina las etiquetas HTML de los resultados de Brave.
- Muestra una imagen de marcador de posición cuando la miniatura de un resultado no se carga.
- Actualiza las traducciones y renueva las dependencias.

Commits originales de esta instantánea: https://github.com/searxng/searxng/compare/774616ada...9e25585ae`,
    de_DE: `Aktualisiert SearXNG auf 2026.7.13.

SearXNG erscheint als Rolling Release und veröffentlicht kein Änderungsprotokoll je Version; dies ist daher eine Momentaufnahme der Upstream-Entwicklung seit 2026.6.30:

- Fügt die Suchmaschinen Sina, Google CSE (einschließlich Bilder), Neocities und Kovunka hinzu.
- Behebt Kagi-Ergebnisse mit rohen HTML-Tags sowie Abstürze, wenn keine Ergebnisse vorliegen.
- Behebt einen Absturz der Google-Autovervollständigung und entfernt HTML-Tags aus Brave-Ergebnissen.
- Zeigt ein Platzhalterbild an, wenn die Vorschau eines Ergebnisses nicht geladen werden kann.
- Aktualisiert Übersetzungen und erneuert Abhängigkeiten.

Upstream-Commits in dieser Momentaufnahme: https://github.com/searxng/searxng/compare/774616ada...9e25585ae`,
    pl_PL: `Aktualizuje SearXNG do 2026.7.13.

SearXNG jest wydawany w trybie ciągłym i nie publikuje dziennika zmian dla poszczególnych wersji, więc jest to migawka rozwoju projektu od 2026.6.30:

- Dodaje wyszukiwarki Sina, Google CSE (w tym obrazy), Neocities i Kovunka.
- Naprawia wyniki Kagi zawierające surowe znaczniki HTML oraz awarie przy braku wyników.
- Naprawia awarię autouzupełniania Google i usuwa znaczniki HTML z wyników Brave.
- Wyświetla obraz zastępczy, gdy miniatura wyniku nie może zostać wczytana.
- Aktualizuje tłumaczenia i odświeża zależności.

Commity źródłowe w tej migawce: https://github.com/searxng/searxng/compare/774616ada...9e25585ae`,
    fr_FR: `Met à jour SearXNG vers 2026.7.13.

SearXNG est publié en flux continu et ne fournit pas de journal des modifications par version ; il s'agit donc d'un instantané du développement en amont depuis 2026.6.30 :

- Ajoute les moteurs de recherche Sina, Google CSE (images comprises), Neocities et Kovunka.
- Corrige les résultats Kagi contenant des balises HTML brutes et les plantages en l'absence de résultats.
- Corrige un plantage de l'autocomplétion Google et supprime les balises HTML des résultats Brave.
- Affiche une image de remplacement lorsque la miniature d'un résultat ne se charge pas.
- Met à jour les traductions et actualise les dépendances.

Commits en amont dans cet instantané : https://github.com/searxng/searxng/compare/774616ada...9e25585ae`,
  },
  migrations: {
    up: async ({ effects }) => {
      const configYaml:
        | {
            'instance-name'?: string
            'enable-metrics'?: boolean
          }
        | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await settingsYaml.merge(effects, {
          general: {
            instance_name: configYaml['instance-name'],
            enable_metrics: configYaml['enable-metrics'],
          },
        })

        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
