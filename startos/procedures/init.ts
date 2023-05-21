import { sdk } from '../sdk'
import { migrations } from './migrations'
import { setInterfaces } from './interfaces'
import { defaultYaml, yamlFile } from './config/file-models/settings.yml'

const install = sdk.setupInstall(async ({ effects, utils }) => {
  await yamlFile.write(defaultYaml, effects)
})

const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
)
