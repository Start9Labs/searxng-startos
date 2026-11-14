import { settingsYaml } from '../fileModels/settings.yml'
import { i18n } from '../i18n'
import { mainHostId, uiId } from '../interfaces'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  instance_name: Value.text({
    name: i18n('Instance Name'),
    description: i18n(
      'The name SearXNG shows for this instance, in the browser tab title and when a browser adds it as a search engine.',
    ),
    required: true,
    default: 'My SearXNG',
  }),
  contact_url: Value.text({
    name: i18n('Contact Address'),
    description: i18n(
      'A mailto: address or web page where the services SearXNG queries can reach you. Wikipedia, Wikidata and OpenStreetMap require it and are turned off while this is empty. It is also linked in the page footer.',
    ),
    required: false,
    default: null,
    placeholder: 'mailto:you@example.com',
    patterns: [
      {
        regex: '^(mailto:[^\\s@]+@[^\\s@]+|https?://\\S+)$',
        description: i18n('Must be a mailto: address or an http(s) URL'),
      },
    ],
  }),
  base_url: Value.dynamicSelect(async ({ effects }) => {
    const urls = await sdk.host
      .getOwn(effects, mainHostId, (host) => {
        const iface =
          host &&
          Object.values(host.bindings)
            .flatMap((b) => Object.values(b.interfaces))
            .find((i) => i.id === uiId)
        return iface ? iface.addressInfo.nonLocal.format() : []
      })
      .const()

    return {
      name: i18n('Primary URL'),
      description: i18n(
        'The address SearXNG uses in links that point back to itself. Choose the one you open it at.',
      ),
      values: urls.reduce(
        (obj, url) => ({
          ...obj,
          [url]: url,
        }),
        {} as Record<string, string>,
      ),
      default:
        urls.find((u) => u.startsWith('http:') && u.includes('.onion')) ?? null,
    }
  }),
  enable_metrics: Value.toggle({
    name: i18n('Enable Stats'),
    description: i18n(
      'Record how each search engine performs and show it on the Stats Dashboard interface, which exists only while this is on.',
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
          contact_url: yaml.general.contact_url ?? null,
          base_url: yaml.server.base_url,
          enable_metrics: yaml.general.enable_metrics,
          proxy_tor: !!yaml.outgoing.using_tor_proxy,
        }
      : {}
  },

  // the execution function
  async ({ effects, input }) =>
    settingsYaml.merge(effects, {
      general: {
        instance_name: input.instance_name,
        contact_url: input.contact_url || undefined,
        enable_metrics: input.enable_metrics,
      },
      server: {
        base_url: input.base_url,
      },
      // The tor SOCKS proxy address (outgoing.proxies) is written reactively by
      // watchTorProxy from tor's container IP — here we only record the intent.
      outgoing: {
        using_tor_proxy: input.proxy_tor ? true : undefined,
      },
    }),
)
