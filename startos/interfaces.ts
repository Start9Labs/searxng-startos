import { settingsYaml } from './fileModels/settings.yml'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })
  const toExport = [
    sdk.createInterface(effects, {
      name: 'Web UI',
      id: 'ui',
      description: 'Web interface for SearXNG',
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
        name: 'Metrics Dashboard',
        id: 'metrics',
        description: 'SearXNG metrics dashboard',
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
