import { utils } from '@start9labs/start-sdk'
import { credentialsJson } from '../fileModels/credentials.json'
import { settingsYaml } from '../fileModels/settings.yml'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await storeJson.merge(effects, {})
  await settingsYaml.merge(effects, {})

  if (!(await credentialsJson.read((c) => c.apiKey).const(effects))) {
    await credentialsJson.merge(
      effects,
      { apiKey: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 32 }) },
      { allowWriteAfterConst: true },
    )
  }
})
