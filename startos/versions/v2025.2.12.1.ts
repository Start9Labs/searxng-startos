import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v2025_2_12_1 = VersionInfo.of({
  version: '2025.2.12:1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // @TODO
    },
    down: IMPOSSIBLE,
  },
})
