import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'searxng',
  title: 'SearXNG',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/searxng-startos',
  upstreamRepo: 'https://github.com/searxng/searxng',
  marketingUrl: 'https://docs.searxng.org',
  donationUrl: 'https://docs.searxng.org/donate.html',
  description: i18n.description,
  volumes: ['main'],
  images: {
    valkey: {
      source: {
        dockerTag: 'valkey/valkey:9-alpine',
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
        dockerTag: 'searxng/searxng:2026.9.30-a9d990033',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
