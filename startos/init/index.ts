import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { seedFiles } from './seedFiles'
import { watchBaseUrl } from './watchBaseUrl'
import { watchTorProxy } from './watchTorProxy'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
  seedFiles,
  watchBaseUrl,
  watchTorProxy,
)

export const uninit = sdk.setupUninit(versionGraph)
