import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { settingsYaml } from '../fileModels/settings.yml'
import { defaultSettings } from '../utils'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await settingsYaml.write(effects, defaultSettings)
  },
})
