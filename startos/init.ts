import { sdk } from './sdk'
import { exposedStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { config } from './actions/config'
import { defaultSettings } from './utils'
import { yamlFile } from './file-models/settings.yml'

// **** Install ****
const install = sdk.setupInstall(async ({ effects }) => {
  await yamlFile.write(effects, defaultSettings)
  // TODO test to ensure this action gets fired on initial install and if base url is deleted via ssh
  yamlFile.read.onChange(async (file) => {
    if (!file?.server.base_url)
      await sdk.action.requestOwn(effects, config, 'critical', {
        reason: 'Configure SearXNG before starting for the first time',
      })
  })
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  exposedStore,
)
