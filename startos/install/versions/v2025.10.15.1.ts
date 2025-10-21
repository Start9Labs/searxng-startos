import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v2025_10_15_1 = VersionInfo.of({
  version: '2025.10.15:1-alpha.0',
  releaseNotes: `\
  ## Update for StartOS 0.4.0

  ### Dependency Updates
  * Updated SDK to beta.41
  * Updated dev dependencies to latest versions

  ### Updated SearXNG code to the latest upstream version.

> **Highlights**
  - **New Azure Search:** You can now search Azure cloud resources directly in SearXNG.
  - **Video Search Improvement:** See video lengths in search results at a glance.
  - **Pinterest and Weather Fixes:** Pinterest results and the !weather command are now more reliable.
  - **Safer Search:** SafeSearch on Startpage now filters results correctly.
  - **Smarter Google Scholar:** Better handling when Google asks for CAPTCHA.

  - Interface and stability updates throughout for a smoother experience.
  `,
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
