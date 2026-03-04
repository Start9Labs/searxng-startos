import { settingsYaml } from '../fileModels/settings.yml'
import { i18n } from '../i18n'
import { uiId } from '../interfaces'
import { sdk } from '../sdk'

export const torProxy = 'socks5h://tor.startos:9050'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  instance_name: Value.text({
    name: i18n('Instance Name'),
    description: i18n(
      'Enter a name for your SearXNG instance. This is the name that will be listed if you want to share your SearXNG engine publicly.',
    ),
    required: true,
    default: 'My SearXNG',
  }),
  base_url: Value.dynamicSelect(async ({ effects }) => {
    const urls = await sdk.serviceInterface
      .getOwn(effects, uiId, (i) => i?.addressInfo?.format() || [])
      .const()

    return {
      name: i18n('Primary URL'),
      description: i18n(
        'Choose which of your SearXNG URLs should serve as the primary URL for the purposes of creating links, sending invites, etc.',
      ),
      values: urls.reduce(
        (obj, url) => ({
          ...obj,
          [url]: url,
        }),
        {} as Record<string, string>,
      ),
      default:
        urls.find((u) => u.startsWith('http:') && u.includes('.onion')) || '',
    }
  }),
  enable_metrics: Value.toggle({
    name: i18n('Enable Stats'),
    description: i18n(
      'Your SearXNG instance will collect anonymous stats about its own usage and performance.',
    ),
    default: false,
  }),
  proxy_tor: Value.toggle({
    name: i18n('Proxy All Traffic Over Tor'),
    description: i18n(
      'Route all search engine requests through the StartOS Tor proxy. This enables Tor-only engines (e.g. Ahmia, Torch) but will make all searches slower.',
    ),
    default: false,
  }),
})

export const setConfig = sdk.Action.withInput(
  // id
  'set-config',

  // metadata
  async ({ effects }) => ({
    name: i18n('Config'),
    description: i18n('Configure settings for your SearXNG instance'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {
    const yaml = await settingsYaml.read().once()
    return yaml
      ? {
          instance_name: yaml.general.instance_name,
          base_url: yaml.server.base_url,
          enable_metrics: yaml.general.enable_metrics,
          proxy_tor:
            !!yaml.outgoing.using_tor_proxy &&
            !!yaml.outgoing.proxies?.['all://']?.includes(torProxy),
        }
      : {}
  },

  // the execution function
  async ({ effects, input }) =>
    settingsYaml.merge(effects, {
      general: {
        instance_name: input.instance_name,
        enable_metrics: input.enable_metrics,
      },
      server: {
        base_url: input.base_url,
      },
      outgoing: input.proxy_tor
        ? {
            proxies: { 'all://': [torProxy] },
            using_tor_proxy: true,
          }
        : {
            proxies: undefined,
            using_tor_proxy: undefined,
          },
    }),
)
