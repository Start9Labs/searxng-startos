import { sdk } from './sdk'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { config } from './actions/config'
import { defaultSettings } from './utils'
import { yamlFile } from './file-models/settings.yml'

// **** Pre Install ****
const preInstall = sdk.setupPreInstall(async ({ effects }) => {
  await yamlFile.write(effects, defaultSettings)
})

// **** Post Install ****
const postInstall = sdk.setupPostInstall(async ({ effects }) => {
  // TODO test to ensure this action gets fired on initial install AND if base url is deleted via ssh
  await sdk.action.requestOwn(effects, config, 'critical', {
    reason: 'Configure SearXNG before starting for the first time',
  })
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  preInstall,
  postInstall,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
)
