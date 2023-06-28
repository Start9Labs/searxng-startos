import { sdk } from '../sdk'
import { migrations } from './migrations'
import { setInterfaces } from './interfaces'
import { defaultYaml, yamlFile } from './config/file-models/settings.yml'

const install = sdk.setupInstall(async ({ effects, utils }) => {
  await yamlFile.write(defaultYaml, effects)
})

const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

const exportedValues = sdk.setupExports(({ effects, utils }) => {
  return {
    ui: [],
    services: [],
  }
})

export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
  exportedValues,
)
