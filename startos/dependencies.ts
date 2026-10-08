import { sdk } from './sdk'
import { settingsYaml } from './fileModels/settings.yml'
import manifestI18n from './manifest/i18n'

const tor = sdk.Dependency.optional('tor', {
  description: manifestI18n.torDescription,
  metadata: {
    title: 'Tor Network Daemon',
    icon: 'https://raw.githubusercontent.com/Start9Labs/tor-startos/65faea17febc739d910e8c26ff4e61f6333487a8/icon.svg',
  },
  versionRange: '>=0.4.9.11:4',
  kind: 'running',
  healthChecks: ['tor'],
  enabled: async ({ effects }) =>
    !!(await settingsYaml
      .read((s) => s.outgoing.using_tor_proxy)
      .const(effects)),
})

export const dependencies = sdk.Dependencies.of().addDependency(tor)
