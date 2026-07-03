import { settingsYaml } from '../fileModels/settings.yml'
import { sdk } from '../sdk'

// Keep the outgoing SOCKS proxy pointed at tor's current container IP. The user
// toggles the intent (outgoing.using_tor_proxy) via the Config action; here we
// resolve tor's bridge address and write the actual proxy URL, reacting to both
// the toggle and tor's IP changing. `.startos` DNS is gone in 2.0 — tor's SOCKS
// is not a StartOS binding, so we read the container IP directly.
export const watchTorProxy = sdk.setupOnInit(async (effects) => {
  const usingTor = await settingsYaml
    .read((s) => s.outgoing.using_tor_proxy ?? false)
    .const(effects)

  if (!usingTor) {
    await settingsYaml.merge(
      effects,
      { outgoing: { proxies: undefined } },
      { allowWriteAfterConst: true },
    )
    return
  }

  const torIp = await sdk.getContainerIp(effects, { packageId: 'tor' }).const()

  await settingsYaml.merge(
    effects,
    {
      outgoing: {
        proxies: torIp
          ? { 'all://': [`socks5h://${torIp}:9050`] }
          : undefined,
      },
    },
    { allowWriteAfterConst: true },
  )
})
