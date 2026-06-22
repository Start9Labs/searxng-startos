import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.22:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.22.

- Adds several new search engines (tusksearch, giphy, iseek, findfiles, and others) and a new "blogs" category.
- Image results now guess their mimetype from the file path.
- Removes the discontinued AOL engine and bumps Python dependencies.

Full changes: https://github.com/searxng/searxng/compare/fd42d4fda...952896d29`,
    es_ES: `Actualiza SearXNG a 2026.6.22.

- Añade varios motores de búsqueda nuevos (tusksearch, giphy, iseek, findfiles y otros) y una nueva categoría "blogs".
- Los resultados de imágenes ahora deducen su tipo MIME a partir de la ruta del archivo.
- Elimina el motor AOL descontinuado y actualiza las dependencias de Python.

Cambios completos: https://github.com/searxng/searxng/compare/fd42d4fda...952896d29`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.22.

- Fügt mehrere neue Suchmaschinen (tusksearch, giphy, iseek, findfiles und weitere) sowie eine neue Kategorie "Blogs" hinzu.
- Bildergebnisse ermitteln ihren MIME-Typ jetzt anhand des Dateipfads.
- Entfernt die eingestellte AOL-Suchmaschine und aktualisiert die Python-Abhängigkeiten.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/fd42d4fda...952896d29`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.22.

- Dodaje kilka nowych wyszukiwarek (tusksearch, giphy, iseek, findfiles i inne) oraz nową kategorię „blogi".
- Wyniki obrazów określają teraz typ MIME na podstawie ścieżki pliku.
- Usuwa wycofaną wyszukiwarkę AOL i aktualizuje zależności Pythona.

Pełna lista zmian: https://github.com/searxng/searxng/compare/fd42d4fda...952896d29`,
    fr_FR: `Met à jour SearXNG vers 2026.6.22.

- Ajoute plusieurs nouveaux moteurs de recherche (tusksearch, giphy, iseek, findfiles et d'autres) ainsi qu'une nouvelle catégorie « blogs ».
- Les résultats d'images devinent désormais leur type MIME à partir du chemin du fichier.
- Supprime le moteur AOL abandonné et met à jour les dépendances Python.

Changements complets : https://github.com/searxng/searxng/compare/fd42d4fda...952896d29`,
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
