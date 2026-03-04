import { sdk } from './sdk'
import { settingsYaml } from './fileModels/settings.yml'

export const setDependencies = sdk.setupDependencies(
  async ({ effects }) => {
    const usingTor = await settingsYaml
      .read((s) => s.outgoing.using_tor_proxy)
      .const(effects)

    if (usingTor) {
      return {
        tor: {
          kind: 'running',
          versionRange: '>=0.4.8:0-beta.0',
          healthChecks: ['tor'],
        },
      }
    }

    return {}
  },
)
