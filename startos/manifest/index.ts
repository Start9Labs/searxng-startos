import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'searxng',
  title: 'SearXNG',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/searxng-startos',
  upstreamRepo: 'https://github.com/searxng/searxng-docker',
  marketingUrl: 'https://docs.searxng.org',
  donationUrl: 'https://docs.searxng.org/donate.html',
  description: i18n.description,
  volumes: ['main'],
  images: {
    valkey: {
      source: {
        dockerTag: 'valkey/valkey:8-alpine',
      },
      arch: ['x86_64', 'aarch64'],
    },
    caddy: {
      source: {
        dockerTag: 'caddy:2-alpine',
      },
      arch: ['x86_64', 'aarch64'],
    },
    searxng: {
      source: {
        dockerTag: 'searxng/searxng:2026.6.5-37187dc2d',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    tor: {
      description: i18n.torDescription,
      optional: true,
      metadata: {
        title: 'Tor Network Daemon',
        icon: 'https://raw.githubusercontent.com/Start9Labs/tor-startos/65faea17febc739d910e8c26ff4e61f6333487a8/icon.svg',
      },
    },
  },
})
