import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  console.info('[i] Starting SearXNG!')

  const valkeySub = await sdk.SubContainer.of(
    effects,
    { imageId: 'valkey' },
    null,
    'valkey-sub',
  )

  return sdk.Daemons.of(effects, started)
    .addDaemon('valkey', {
      subcontainer: valkeySub,
      exec: {
        command: [
          'valkey-server',
          '--save',
          ``,
          '--appendonly',
          `no`,
          '--unixsocket',
          '/var/run/valkey.sock',
        ],
      },
      ready: {
        display: 'Valkey',
        fn: async () => {
          const res = await valkeySub.exec(['valkey-cli', 'ping'])
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
        cwd: '/usr/local/searxng',
        command: ['sh', '/usr/local/searxng/entrypoint.sh'],
      },
      ready: {
        display: 'Web Interface',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: 'The web interface is ready',
            errorMessage: 'The web interface is not ready',
          }),
      },
      requires: ['valkey'],
    })
})
