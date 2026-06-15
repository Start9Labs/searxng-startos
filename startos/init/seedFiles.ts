import { settingsYaml } from '../fileModels/settings.yml'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await storeJson.merge(effects, {})
  await settingsYaml.merge(effects, {})
})
