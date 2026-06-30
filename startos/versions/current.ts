import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { settingsYaml } from '../fileModels/settings.yml'

export const current = VersionInfo.of({
  version: '2026.6.30:0',
  releaseNotes: {
    en_US: `Updated SearXNG to 2026.6.30.

- Adds new image engines (picjumbo, StockSnap, Shopify stock images, magnific) and the neosearch general engine.
- Adds related-search suggestions to the tiger engine and time-range support to bilibili.
- Fixes results for baidu, naver, and qwant, and makes resulthunter result images clickable again.

Full changes: https://github.com/searxng/searxng/compare/e3126b89e...774616ada`,
    es_ES: `Actualiza SearXNG a 2026.6.30.

- Añade nuevos motores de imágenes (picjumbo, StockSnap, imágenes de stock de Shopify, magnific) y el motor general neosearch.
- Añade sugerencias de búsqueda relacionada al motor tiger y soporte de rango de tiempo a bilibili.
- Corrige resultados de baidu, naver y qwant, y hace que las imágenes de resultados de resulthunter vuelvan a ser clicables.

Cambios completos: https://github.com/searxng/searxng/compare/e3126b89e...774616ada`,
    de_DE: `Aktualisiert SearXNG auf 2026.6.30.

- Fügt neue Bild-Suchmaschinen hinzu (picjumbo, StockSnap, Shopify-Stockbilder, magnific) sowie die allgemeine Suchmaschine neosearch.
- Fügt verwandte Suchvorschläge zur tiger-Suchmaschine und Zeitbereichsunterstützung zu bilibili hinzu.
- Behebt Ergebnisse für baidu, naver und qwant und macht resulthunter-Ergebnisbilder wieder anklickbar.

Vollständige Änderungen: https://github.com/searxng/searxng/compare/e3126b89e...774616ada`,
    pl_PL: `Aktualizuje SearXNG do 2026.6.30.

- Dodaje nowe wyszukiwarki obrazów (picjumbo, StockSnap, obrazy stockowe Shopify, magnific) oraz ogólną wyszukiwarkę neosearch.
- Dodaje sugestie powiązanych wyszukiwań do wyszukiwarki tiger oraz obsługę zakresu czasu do bilibili.
- Naprawia wyniki dla baidu, naver i qwant oraz przywraca klikalność obrazów wyników resulthunter.

Pełna lista zmian: https://github.com/searxng/searxng/compare/e3126b89e...774616ada`,
    fr_FR: `Met à jour SearXNG vers 2026.6.30.

- Ajoute de nouveaux moteurs d'images (picjumbo, StockSnap, images de stock Shopify, magnific) et le moteur général neosearch.
- Ajoute des suggestions de recherche associée au moteur tiger et la prise en charge de la plage horaire à bilibili.
- Corrige les résultats de baidu, naver et qwant, et rend à nouveau cliquables les images de résultats de resulthunter.

Changements complets : https://github.com/searxng/searxng/compare/e3126b89e...774616ada`,
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
