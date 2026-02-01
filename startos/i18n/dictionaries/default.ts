export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting SearXNG!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  'Caddy is ready': 4,
  'Caddy is not ready': 5,
  'Web UI': 6,
  'Web interface for SearXNG': 7,
  'Stats Dashboard': 8,
  'SearXNG stats dashboard': 9,
  'Instance Name': 10,
  'Enter a name for your SearXNG instance. This is the name that will be listed if you want to share your SearXNG engine publicly.': 11,
  'Primary URL': 12,
  'Choose which of your SearXNG URLs should serve as the primary URL for the purposes of creating links, sending invites, etc.': 13,
  'Enable Stats': 14,
  'Your SearXNG instance will collect anonymous stats about its own usage and performance.': 15,
  'Config': 16,
  'Configure settings for your SearXNG instance': 17,
  'Required configurations are missing': 18,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
