import { setConfig } from '../actions/setConfig'
import { settingsYaml } from '../fileModels/settings.yml'
import { sdk } from '../sdk'

export const taskConfig = sdk.setupOnInit(async (effects) => {
  const config = await settingsYaml
    .read((s) => ({
      base_url: s.server.base_url,
      instance_name: s.general.instance_name,
    }))
    .const(effects)

  if (!config?.base_url || !config.instance_name) {
    await sdk.action.createOwnTask(effects, setConfig, 'critical', {
      reason: 'Required configurations are missing',
    })
  }
})
