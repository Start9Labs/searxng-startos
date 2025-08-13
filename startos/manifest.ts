import { setupManifest } from '@start9labs/start-sdk'
import { SDKImageInputSpec } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'

const BUILD = process.env.BUILD || ''

const architectures =
  BUILD === 'x86'
    ? ['x86_64']
    : BUILD === 'arm'
      ? ['aarch64']
      : ['x86_64', 'aarch64']

export const manifest = setupManifest({
  id: 'searxng',
  title: 'SearXNG',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/searxng-startos',
  upstreamRepo: 'https://github.com/searxng/searxng-docker',
  supportSite: 'https://github.com/searxng/searxng-docker/issues',
  marketingSite: 'https://docs.searxng.org',
  donationUrl: 'https://docs.searxng.org/donate.html',
  docsUrl:
    'https://github.com/Start9Labs/searxng-startos/blob/master/instructions.md',
  description: {
    short: 'Privacy-preserving internet metasearch engine.',
    long: 'SearXNG is an Internet metasearch engine that aggregates results from more than 70 search services. It also helps protect your privacy by withholding sensitive metadata from the underlying search services. Your SearXNG instance is highly configurable, and can even be shared with friends and family.',
  },
  volumes: ['main'],
  images: {
    valkey: {
      source: {
        dockerTag: 'valkey/valkey:8-alpine',
      },
      arch: architectures,
    } as SDKImageInputSpec,
    searxng: {
      source: {
        dockerTag: 'searxng/searxng:2025.8.9-935f3fe',
      },
      arch: architectures,
    } as SDKImageInputSpec,
  },
  hardwareRequirements: {
    arch: architectures,
  },
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
