import { settingsYaml } from '../fileModels/settings.yml'
import { sdk } from '../sdk'
import {} from '../utils'
import { socksHostId, socksPort } from 'tor-startos/startos/utils'

// Keep the outgoing SOCKS proxy pointed at tor's SOCKS bridge address. The user
// toggles the intent (outgoing.using_tor_proxy) via the Config action; here we
// resolve tor's bridge address and write the actual proxy URL, reacting to both
// the toggle and tor appearing/disappearing. No fallbackPort: this proxy
// anonymizes ALL outbound queries, so when tor is absent the helper resolves
// null and we write no proxy rather than dial a dead port. The .const() heals
// automatically — installing tor later fires once and configures the proxy.
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

  const torSocks = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'tor',
      hostId: socksHostId,
      internalPort: socksPort,
    })
    .const()

  await settingsYaml.merge(
    effects,
    {
      outgoing: {
        proxies: torSocks ? { 'all://': [`socks5h://${torSocks}`] } : undefined,
      },
    },
    { allowWriteAfterConst: true },
  )
})
