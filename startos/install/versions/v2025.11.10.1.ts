import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v2025_11_10_1 = VersionInfo.of({
  version: '2025.11.10:1-alpha.1',
  releaseNotes: `\
## Update for StartOS 0.4.0

### Dependency Updates
* Updated SDK to beta.44
* Updated interface name for backwards compatibility
* Updated dev dependencies to latest versions

### Updated SearXNG code to the latest upstream version.
  `,
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
