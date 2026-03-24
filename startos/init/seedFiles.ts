import { sdk } from '../sdk'
import { settingsYaml } from '../fileModels/settings.yml'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await settingsYaml.merge(effects, {})
})
