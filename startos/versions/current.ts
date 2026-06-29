import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.29:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.29. A maintenance release adding new search engines.

- Adds new image engines (picjumbo, StockSnap, Shopify stock images, magnific) and the neosearch general engine.
- Adds related-search suggestions to the Tiger engine and fixes its captcha paths.
- Fixes unclickable images in Resulthunter results.

Full changes: https://github.com/searxng/searxng/compare/e3126b89e...cb4bfbe12`,
    es_ES: `Actualiza SearXNG a 2026.6.29. Una versión de mantenimiento que añade nuevos motores de búsqueda.

- Añade nuevos motores de imágenes (picjumbo, StockSnap, imágenes de stock de Shopify, magnific) y el motor general neosearch.
- Añade sugerencias de búsquedas relacionadas al motor Tiger y corrige sus rutas de captcha.
- Corrige las imágenes no clicables en los resultados de Resulthunter.

Cambios completos: https://github.com/searxng/searxng/compare/e3126b89e...cb4bfbe12`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.29. Eine Wartungsversion mit neuen Suchmaschinen.

- Fügt neue Bild-Suchmaschinen (picjumbo, StockSnap, Shopify-Stockbilder, magnific) und die allgemeine Suchmaschine neosearch hinzu.
- Fügt der Tiger-Suchmaschine Vorschläge für verwandte Suchanfragen hinzu und behebt ihre Captcha-Pfade.
- Behebt nicht anklickbare Bilder in Resulthunter-Ergebnissen.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/e3126b89e...cb4bfbe12`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.29. Wersja konserwacyjna dodająca nowe wyszukiwarki.

- Dodaje nowe wyszukiwarki obrazów (picjumbo, StockSnap, obrazy stockowe Shopify, magnific) oraz ogólną wyszukiwarkę neosearch.
- Dodaje sugestie powiązanych wyszukiwań do wyszukiwarki Tiger i naprawia jej ścieżki captcha.
- Naprawia nieklikalne obrazy w wynikach Resulthunter.

Pełna lista zmian: https://github.com/searxng/searxng/compare/e3126b89e...cb4bfbe12`,
    fr_FR: `Met à jour SearXNG vers 2026.6.29. Une version de maintenance ajoutant de nouveaux moteurs de recherche.

- Ajoute de nouveaux moteurs d'images (picjumbo, StockSnap, images de stock Shopify, magnific) et le moteur général neosearch.
- Ajoute des suggestions de recherches associées au moteur Tiger et corrige ses chemins de captcha.
- Corrige les images non cliquables dans les résultats de Resulthunter.

Changements complets : https://github.com/searxng/searxng/compare/e3126b89e...cb4bfbe12`,
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
