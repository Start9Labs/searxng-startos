import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  console.info('Starting SearXNG!')

  const additionalChecks: T.HealthCheck[] = []

  const redisContainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'redis' },
    'primary',
  )

  return sdk.Daemons.of(effects, started, additionalChecks)
    .addDaemon('redis', {
      subcontainer: redisContainer,
      command: ['redis-server', '--save', `""`, '--appendonly', `"no"`],
      mounts: sdk.Mounts.of().addVolume('main', null, '/data', false),
      ready: {
        display: null,
        fn: async () => {
          const res = await redisContainer.exec(['redis-cli', 'ping'])
          return res.stdout === 'PONG'
            ? // no message needed since display is null
              { message: '', result: 'success' }
            : { message: '', result: 'failure' }
        },
      },
      requires: [],
    })
    .addDaemon('searxng', {
      subcontainer: { imageId: 'searx' },
      // TODO how do we use entrypoint command in upstream Dockerfile
      command: ['sh', '/usr/local/searxng/dockerfiles/docker-entrypoint.sh'],
      mounts: sdk.Mounts.of().addVolume('main', null, '/data', false),
      ready: {
        display: 'Web Interface',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: 'The web interface is ready',
            errorMessage: 'The web interface is not ready',
          }),
      },
      requires: ['redis'],
    })
})
