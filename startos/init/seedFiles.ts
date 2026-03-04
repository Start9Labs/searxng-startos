import { sdk } from '../sdk'
import { settingsYaml } from '../fileModels/settings.yml'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return
  await settingsYaml.merge(effects, {})
})
