import { config } from '../actions/config'
import { settingsYaml } from '../fileModels/settings.yml'
import { sdk } from '../sdk'

export const taskConfig = sdk.setupOnInstall(async (effects) => {
  if (!(await settingsYaml.read((s) => s.server.base_url).const(effects))) {
    await sdk.action.createOwnTask(effects, config, 'critical', {
      reason: 'Configure SearXNG',
    })
  }
})
