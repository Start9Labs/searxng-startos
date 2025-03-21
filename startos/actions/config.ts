import { yamlFile } from '../file-models/settings.yml'
import { sdk } from '../sdk'
import { getPrimaryInterfaceUrls, defaultSettings } from '../utils'

const { InputSpec, Value } = sdk

const { instance_name, enable_metrics } = defaultSettings.general

export const inputSpec = InputSpec.of({
  instance_name: Value.text({
    name: 'Instance Name',
    description:
      'Enter a name for your SearXNG instance. This is the name that will be listed if you want to share your SearXNG engine publicly.',
    required: true,
    default: instance_name,
  }),
  base_url: Value.dynamicSelect(async ({ effects }) => {
    const urls = await getPrimaryInterfaceUrls(effects)

    return {
      name: 'Primary URL',
      description:
        'Choose which of your SearXNG URLs should serve as the primary URL for the purposes of creating links, sending invites, etc.',
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
    name: 'Enable Metrics',
    description:
      'Your SearXNG instance will collect anonymous stats about its own usage and performance. You can view these metrics by appending `/stats` or `/stats/errors` to your SearXNG URL.',
    default: enable_metrics,
  }),
})

export const config = sdk.Action.withInput(
  // id
  'config',

  // metadata
  async ({ effects }) => ({
    name: 'Config',
    description: 'Configure settings for your SearXNG instance',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {
    const { general, server } = (await yamlFile.read.const(effects))!
    return {
      instance_name: general.instance_name,
      base_url: server.base_url,
      enable_metrics: general.enable_metrics,
    }
  },

  // the execution function
  async ({ effects, input }) =>
    yamlFile.merge(effects, {
      general: {
        instance_name: input.instance_name,
        enable_metrics: input.enable_metrics,
      },
      server: {
        base_url: input.base_url,
      },
    }),
)
