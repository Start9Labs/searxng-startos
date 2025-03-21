import { Effects } from "@start9labs/start-sdk/base/lib/Effects"
import { sdk } from './sdk'

export const uiPort = 80

export const defaultSettings = {
  use_default_settings: true,
  server: {
    secret_key: 'hmmm', // update
    limiter: false, // can be disabled for a private instance
    image_proxy: true,
    base_url: ''
  },
  ui: {
    static_use_hash: true,
  },
  redis: {
    url: 'redis://searxng.embassy:6379/0', // TODO ask aiden if we can use unix sockets instead
  },
  general: {
    debug: false,
    instance_name: 'My SearXNG',
    enable_metrics: false,
  },
  outgoing: {
    request_timeout: 3.5,
  },
}

export async function getPrimaryInterfaceUrls(
  effects: Effects,
): Promise<string[]> {
  const httpInterface = await sdk.serviceInterface
    .getOwn(effects, 'primary')
    .const()

  return httpInterface?.addressInfo?.urls || []
}