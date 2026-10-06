import { FileHelper, z, utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { valkeyPort } from '../utils'

function randomPassword() {
  return {
    charset: 'a-z,A-Z,0-9',
    len: 24,
  }
}

const serverSchema = z.looseObject({
  secret_key: z.string().catch(utils.getDefaultString(randomPassword())),
  limiter: z.boolean().catch(false),
  image_proxy: z.literal(true).catch(true),
  base_url: z.string().catch(''),
})

const valkeyUrl = `valkey://127.0.0.1:${valkeyPort}/0` as const

const valkeySchema = z.looseObject({
  url: z.literal(valkeyUrl).catch(valkeyUrl),
})

const generalSchema = z.looseObject({
  debug: z.literal(false).catch(false),
  instance_name: z.string().catch('My SearXNG'),
  enable_metrics: z.boolean().catch(false),
})

const outgoingSchema = z.looseObject({
  request_timeout: z.number().catch(3.5),
  proxies: z
    .record(z.string(), z.array(z.string()))
    .optional()
    .catch(undefined),
  using_tor_proxy: z.boolean().optional().catch(undefined),
})

const searchSchema = z.looseObject({
  formats: z.array(z.string()).catch(() => ['html', 'json']),
})

const engineSchema = z.looseObject({
  name: z.string(),
  engine: z.string().optional(),
  api_key: z.string().optional(),
  inactive: z.boolean().optional(),
  disabled: z.boolean().optional(),
})

export type EngineEntry = z.infer<typeof engineSchema>

const shape = z.looseObject({
  use_default_settings: z.literal(true).catch(true),
  server: serverSchema.catch(() => serverSchema.parse({})),
  valkey: valkeySchema.catch(() => valkeySchema.parse({})),
  general: generalSchema.catch(() => generalSchema.parse({})),
  outgoing: outgoingSchema.catch(() => outgoingSchema.parse({})),
  search: searchSchema.catch(() => searchSchema.parse({})),
  engines: z.array(engineSchema).optional().catch(undefined),
})

export type SettingsType = z.infer<typeof shape>

export const settingsYaml = FileHelper.yaml(
  {
    base: sdk.volumes.main,
    subpath: 'settings.yml',
  },
  shape,
)
