import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'searxng',
  title: 'SearXNG',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/searxng-startos',
  upstreamRepo: 'https://github.com/searxng/searxng-docker',
  supportSite: 'https://github.com/searxng/searxng-docker/issues',
  marketingSite: 'https://docs.searxng.org',
  donationUrl: 'https://docs.searxng.org/donate.html',
  description: {
    short: 'Privacy-preserving internet metasearch engine.',
    long: 'SearXNG is an Internet metasearch engine that aggregates results from more than 70 search services. It also helps protect your privacy by withholding sensitive metadata from the underlying search services. Your SearXNG instance is highly configurable, and can even be shared with friends and family.',
  },
  volumes: ['main'],
  images: {
    redis: {
      source: {
        dockerTag: 'valkey/valkey:8-alpine',
      },
    },
    searx: {
      source: {
        dockerTag: 'searxng/searxng:2025.2.12-d456f3dd9',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
