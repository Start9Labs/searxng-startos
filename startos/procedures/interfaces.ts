import { sdk } from '../sdk'
import { configSpec } from './config/spec'

export const uiPort = 8080
export const uiId = 'webui'

export const setInterfaces = sdk.setupInterfaces(
  configSpec,
  async ({ effects, utils, input }) => {
    const multi = utils.host.multi('multi')
    const multiOrigin = await multi.bindPort(uiPort, { protocol: 'http' })
    const multiInterface = utils.createInterface({
      name: 'Web UI',
      id: uiId,
      description: 'The web user interface of SearXNG',
      hasPrimary: false,
      disabled: false,
      ui: true,
      username: null,
      path: '',
      search: {},
    })

    const multiReceipt = await multiInterface.export([multiOrigin])

    return [multiReceipt]
  },
)
