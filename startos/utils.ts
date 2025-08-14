import { utils } from '@start9labs/start-sdk'
import { Effects } from '@start9labs/start-sdk/base/lib/Effects'
import { sdk } from './sdk'

export const uiPort = 8080

export function randomPassword() {
  return {
    charset: 'a-z,A-Z,0-9',
    len: 24,
  }
}

export const defaultSettings = {
  use_default_settings: true,
  server: {
    secret_key: utils.getDefaultString(randomPassword()), // Uses StartOS password generation
    limiter: false, // can be disabled for a private instance
    image_proxy: true,
    base_url: '',
  },
  ui: {
    static_use_hash: true,
  },
  valkey: {
    url: 'valkey:///var/run/valkey.sock',
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
  const httpInterface = await sdk.serviceInterface.getOwn(effects, 'ui').const()

  return httpInterface?.addressInfo?.urls || []
}
