import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2026_7_13_0 } from './v2026.7.13_0'
import { v_2026_9_30_1 } from './v2026.9.30_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2026_7_13_0, v_2026_9_30_1],
})
