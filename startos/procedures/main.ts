import { sdk } from '../sdk'
import { checkPortListening } from '@start9labs/start-sdk/lib/health/checkFns'
import { ExpectedExports } from '@start9labs/start-sdk/lib/types'
import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { uiPort } from './interfaces'

export const main: ExpectedExports.main = sdk.setupMain(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     */
    console.info('Starting SearXNG...')

    /**
     * ======================== Additional Health Checks (optional) ========================
     */
    const healthReceipts: HealthReceipt[] = []

    /**
     * ======================== Daemons ========================
     */

    const SEARXNG_SECRET = (
      await utils.childProcess.exec('openssl rand -hex 32')
    ).stdout

    return Daemons.of({
      effects,
      started,
      healthReceipts,
    })
      .addDaemon('redis', {
        command: 'redis-server --save  "" --appendonly no',
        ready: {
          display: null,
          fn: async () =>
            sdk.healthCheck.runHealthScript(
              effects,
              'redis 127.0.0.1:6379> PING',
            ),
        },
        requires: [],
      })
      .addDaemon('searxng', {
        command: 'sh /usr/local/searxng/dockerfiles/docker-entrypoint.sh',
        env: {
          SEARXNG_SECRET,
        },
        ready: {
          display: 'Web Interface',
          fn: () =>
            checkPortListening(effects, uiPort, {
              successMessage: 'The web interface is ready',
              errorMessage: 'The web interface is not ready',
            }),
        },
        requires: ['redis'],
      })
  },
)
