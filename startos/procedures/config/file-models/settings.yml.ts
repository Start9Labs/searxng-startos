import { matches } from '@start9labs/start-sdk'
import FileHelper from '@start9labs/start-sdk/lib/util/fileHelper'

const { object, literal, string } = matches

const yamlShape = object({
  use_default_settings: literal(true),
  server: object({
    image_proxy: literal(true),
  }),
  redis: object({
    url: string,
  }),
  ui: object({
    use_static_hash: literal(true),
  }),
})

export const yamlFile = FileHelper.toml('/etc/searxng/settings.yml', yamlShape)

export const defaultYaml: typeof yamlShape._TYPE = {
  use_default_settings: true,
  server: {
    image_proxy: true,
  },
  redis: {
    url: 'redis://searxng.embassy:6379/0',
  },
  ui: {
    use_static_hash: true,
  },
}
