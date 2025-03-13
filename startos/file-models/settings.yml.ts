import { matches, FileHelper } from '@start9labs/start-sdk'
import { defaultSettings } from '../utils'

const { object, string, literal, boolean, number } = matches
const { use_default_settings, server, ui, redis, general, outgoing } =
  defaultSettings

const shape = object({
  use_default_settings:
    literal(use_default_settings).onMismatch(use_default_settings),
  server: object({
    secret_key: string.onMismatch(server.secret_key), // update
    limiter: boolean.onMismatch(server.limiter), // can be disabled for a private instance
    image_proxy: literal(server.image_proxy).onMismatch(server.image_proxy),
  }),
  ui: object({
    static_use_hash: literal(ui.static_use_hash).onMismatch(ui.static_use_hash),
  }),
  redis: object({
    url: literal(redis.url).onMismatch(redis.url),
  }),
  general: object({
    debug: literal(general.debug).onMismatch(general.debug),
    instance_name: string.optional().onMismatch(general.instance_name),
    enable_metrics: boolean.onMismatch(general.enable_metrics),
  }),
  outgoing: object({
    request_timeout: number.onMismatch(outgoing.request_timeout),
  }),
})

export const yamlFile = FileHelper.yaml(
  '/media/startos/volumes/main/settings.yml',
  shape,
)
