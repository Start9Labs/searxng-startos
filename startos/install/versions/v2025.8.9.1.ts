import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v2025_8_9_1 = VersionInfo.of({
  version: '2025.8.9:1-alpha.0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // @TODO
    },
    down: IMPOSSIBLE,
  },
})
