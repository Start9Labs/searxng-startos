import { rmdir } from 'fs/promises'
import { sdk } from '../../sdk'
import { defaultYaml, yamlFile } from '../config/file-models/settings.yml'

export const v1_0_0_4 = sdk.Migration.of({
  version: '1.0.0.4',
  up: async ({ effects, utils }) => {
    await yamlFile.write(defaultYaml, effects)

    // remove old start9 dir
    await rmdir('/root/start9')
  },
  down: async ({ effects }) => {
    throw new Error('Downgrade not permitted')
  },
})
