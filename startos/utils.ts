export const uiPort = 80

export const defaultSettings = {
  use_default_settings: true,
  server: {
    secret_key: 'hmmm', // update
    limiter: false, // can be disabled for a private instance
    image_proxy: true,
  },
  ui: {
    static_use_hash: true,
  },
  redis: {
    url: 'redis://searxng.embassy:6379/0',
  },
  general: {
    debug: false,
    instance_name: undefined,
    enable_metrics: false,
  },
  outgoing: {
    request_timeout: 3.5,
  },
}
