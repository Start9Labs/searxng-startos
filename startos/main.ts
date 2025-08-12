import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  console.info('[i] Starting SearXNG!')

  const redisSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'redis' },
    null,
    'redis-sub',
  )

  return sdk.Daemons.of(effects, started)
    .addDaemon('redis', {
      subcontainer: redisSub,
      exec: { command: ['redis-server', '--save', ``, '--appendonly', `no`] },
      ready: {
        display: 'Redis',
        fn: async () => {
          const res = await redisSub.exec(['redis-cli', 'ping'])
          return res.stdout.toString().trim() === 'PONG'
            ? // no message needed since display is null
              { message: '', result: 'success' }
            : { message: res.stdout.toString().trim(), result: 'failure' }
        },
      },
      requires: [],
    })
    .addDaemon('searxng', {
      subcontainer: await sdk.SubContainer.of(
        effects,
        { imageId: 'searxng' },
        sdk.Mounts.of().mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: '/etc/searxng',
          readonly: false,
        }),
        'searxng-sub',
      ),
      exec: {
        command: ['sh', '/usr/local/searxng/dockerfiles/docker-entrypoint.sh'],
      },
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
