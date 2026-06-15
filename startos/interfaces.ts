import { settingsYaml } from './fileModels/settings.yml'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort, uiUsername } from './utils'

export const uiId = 'ui'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'main')

  // When a password is set (via the Manage Access action), the OS reverse
  // proxy enforces basic auth at the edge for everything on this port — both
  // the Web UI and the Stats Dashboard. No password set ⇒ public.
  const password = await storeJson.read((s) => s?.uiPassword).const(effects)
  const realm =
    (await settingsYaml.read((s) => s.general?.instance_name).const(effects)) ||
    'SearXNG'

  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
    addSsl: password
      ? {
          auth: {
            type: 'basic',
            credentials: [{ username: uiUsername, password }],
            realm,
          },
        }
      : undefined,
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
