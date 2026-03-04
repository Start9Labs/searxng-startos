import { FileHelper, z, utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

function randomPassword() {
  return {
    charset: 'a-z,A-Z,0-9',
    len: 24,
  }
}

const shape = z.object({
  use_default_settings: z.literal(true).catch(true),
  server: z.object({
    secret_key: z.string().catch(utils.getDefaultString(randomPassword())),
    limiter: z.boolean().catch(false),
    image_proxy: z.literal(true).catch(true),
    base_url: z.string().catch(''),
  }),
  ui: z.object({
    static_use_hash: z.literal(true).catch(true),
  }),
  valkey: z.object({
    url: z.literal('valkey:///var/run/valkey.sock').catch('valkey:///var/run/valkey.sock'),
  }),
  general: z.object({
    debug: z.literal(false).catch(false),
    instance_name: z.string().optional().catch('My SearXNG'),
    enable_metrics: z.boolean().catch(false),
  }),
  outgoing: z.object({
    request_timeout: z.number().catch(3.5),
    proxies: z.record(z.string(), z.array(z.string())).optional().catch(undefined),
    using_tor_proxy: z.boolean().optional().catch(undefined),
  }),
})

export type SettingsType = z.infer<typeof shape>

export const settingsYaml = FileHelper.yaml(
  {
    base: sdk.volumes.main,
    subpath: 'settings.yml',
  },
  shape,
)
