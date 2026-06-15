import { settingsYaml } from '../fileModels/settings.yml'
import { uiId } from '../interfaces'
import { sdk } from '../sdk'

// Keep the primary URL valid without a required config step: whenever the
// configured base_url is missing or no longer one of the host's available
// addresses, fall back to the service's .local (mDNS) address. Reacts to both
// the base_url and the available addresses changing.
export const watchBaseUrl = sdk.setupOnInit(async (effects) => {
  const baseUrl = await settingsYaml
    .read((s) => s.server.base_url)
    .const(effects)

  const addresses = await sdk.serviceInterface
    .getOwn(effects, uiId, (i) => ({
      available: i?.addressInfo?.nonLocal.format() ?? [],
      mdns: i?.addressInfo?.filter({ kind: 'mdns' }).format()[0] ?? null,
    }))
    .const()

  if (!addresses.mdns) return
  if (baseUrl && addresses.available.includes(baseUrl)) return

  await settingsYaml.merge(
    effects,
    { server: { base_url: addresses.mdns } },
    { allowWriteAfterConst: true },
  )
})
