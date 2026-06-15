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
  'Proxy All Traffic Over Tor': 19,
  'Route all search engine requests through the StartOS Tor proxy. This enables Tor-only engines (e.g. Ahmia, Torch) but will make all searches slower.': 20,
  'Engine API Keys': 21,
  'Configure API keys for paid SearXNG engines. Removing an entry reverts the engine to its upstream default.': 22,
  'API Key': 23,
  'Engine ID': 25,
  'The SearXNG engine module name (e.g. "kagi"). Must match a real engine module.': 26,
  'Manage Access': 27,
  'Make your SearXNG instance public, or require a username and password to use it. The username is always "admin"; you set the password. This protects both the Web UI and the Stats Dashboard.': 28,
  'Access': 29,
  'Choose who can use your SearXNG instance. Public: anyone with the address can use it. Private: require a username and password to log in.': 30,
  'Public': 31,
  'Private (require login)': 32,
  'Password': 33,
  'The password for logging in as "admin". Use the generate button for a strong random password, or type your own.': 34,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
