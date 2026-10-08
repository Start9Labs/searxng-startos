import { sdk } from '../sdk'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { seedFiles } from './seedFiles'
import { watchBaseUrl } from './watchBaseUrl'
import { watchTorProxy } from './watchTorProxy'
import { reattachTorOnions } from './reattachTorOnions'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  actions,
  dependencies,
  seedFiles,
  watchBaseUrl,
  watchTorProxy,
  reattachTorOnions,
)

export const uninit = sdk.setupUninit(versionGraph)
