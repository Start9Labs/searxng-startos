import { sdk } from '../sdk'
import { setConfig } from './setConfig'
import { setEngineKeys } from './setEngineKeys'

export const actions = sdk.Actions.of()
  .addAction(setConfig)
  .addAction(setEngineKeys)
