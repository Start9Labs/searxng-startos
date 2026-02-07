import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'searxng',
  title: 'SearXNG',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/searxng-startos',
  upstreamRepo: 'https://github.com/searxng/searxng-docker',
  supportSite: 'https://github.com/searxng/searxng-docker/issues',
  marketingSite: 'https://docs.searxng.org',
  donationUrl: 'https://docs.searxng.org/donate.html',
  docsUrl: 'https://docs.searxng.org/',
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
        dockerTag: 'searxng/searxng:2026.1.30-ad42b553b',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
