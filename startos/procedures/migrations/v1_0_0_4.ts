import { sdk } from '../../sdk'
import { defaultYaml, yamlFile } from '../config/file-models/settings.yml'

export const v1_0_0_4 = sdk.Migration.of({
  version: '1.0.0.4',
  up: async ({ effects }) => {
    await yamlFile.write(defaultYaml, effects)

    // remove old start9 dir
    await effects.runCommand(['rm', '-rf', '/root/start9'])
  },
  down: async ({ effects }) => {
    throw new Error('Downgrade not permitted')
  },
})
