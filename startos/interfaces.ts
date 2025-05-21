import { settingsYaml } from './fileModels/settings.yml'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })
  const toExport = []
  toExport.push(
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
  )
  // TODO test that this interface is active only if metrics are enabled
  settingsYaml
    .read((s) => s.general?.enable_metrics)
    .onChange(effects, (enable_metrics) => {
      if (enable_metrics) {
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
    })
  const uiReceipt = await uiMultiOrigin.export(toExport)

  return [uiReceipt]
})
