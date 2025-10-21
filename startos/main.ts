import { writeFile } from 'fs/promises'
import { sdk } from './sdk'
import { uiPort, getCaddyfile } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  console.info('[i] Starting SearXNG!')

  const valkeySub = await sdk.SubContainer.of(
    effects,
    { imageId: 'valkey' },
    null,
    'valkey-sub',
  )

  const caddySub = await sdk.SubContainer.of(
    effects,
    { imageId: 'caddy' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: 'caddy',
      mountpoint: '/data',
      readonly: false,
    }),
    'caddy-sub',
  )

  const searxngSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'searxng' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/etc/searxng',
      readonly: false,
    }),
    'searxng-sub',
  )

  // Write Caddyfile to Caddy container's root filesystem
  await writeFile(`${caddySub.rootfs}/Caddyfile`, getCaddyfile())

  // Create empty limiter.toml for now to suppress SearXNG warning
  await writeFile(`${searxngSub.rootfs}/etc/searxng/limiter.toml`, '')

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
            ? { message: '', result: 'success' }
            : { message: res.stdout.toString().trim(), result: 'failure' }
        },
      },
      requires: [],
    })
    .addDaemon('searxng', {
      subcontainer: searxngSub,
      exec: {
        cwd: '/usr/local/searxng',
        command: ['sh', '/usr/local/searxng/entrypoint.sh'],
        env: {
          PYTHONWARNINGS: 'ignore::DeprecationWarning'
        },
      },
      ready: {
        display: 'Web Interface',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, 8080, {
            successMessage: 'The web interface is ready',
            errorMessage: 'The web interface is not ready',
          }),
      },
      requires: ['valkey'],
    })
    .addDaemon('caddy', {
      subcontainer: caddySub,
      exec: {
        command: ['caddy', 'run', '--config', '/Caddyfile'],
        env: {
          HOME: '/root'
        },
      },
      ready: {
        display: 'Caddy',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: 'Caddy is ready',
            errorMessage: 'Caddy is not ready',
          }),
      },
      requires: ['searxng'],
    })
})
