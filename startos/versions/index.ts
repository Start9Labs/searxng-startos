import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2026_7_13_0 } from './v2026.7.13_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2026_7_13_0],
})
