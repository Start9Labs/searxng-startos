import { settingsYaml } from './fileModels/settings.yml'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const uiId = 'ui'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'main')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })
  const toExport = [
    sdk.createInterface(effects, {
      name: i18n('Web UI'),
      id: uiId,
      description: i18n('Web interface for SearXNG'),
      type: 'ui',
      masked: false,
      schemeOverride: null,
      username: null,
      path: '',
      query: {},
    }),
  ]

  const enableMetrics = await settingsYaml
    .read((s) => s.general?.enable_metrics)
    .const(effects)

  if (enableMetrics) {
    toExport.push(
      sdk.createInterface(effects, {
        name: i18n('Stats Dashboard'),
        id: 'metrics',
        description: i18n('SearXNG stats dashboard'),
        type: 'ui',
        masked: false,
        schemeOverride: null,
        username: null,
        path: '/stats',
        query: {},
      }),
    )
  }
  const uiReceipt = await uiMultiOrigin.export(toExport)

  return [uiReceipt]
})
