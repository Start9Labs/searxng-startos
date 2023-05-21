import { setupManifest } from "@start9labs/start-sdk/lib/manifest/setupManifest";

export const manifest = setupManifest({
  id: "searxng",
  title: "SearXNG",
  version: "1.0.0.3",
  releaseNotes: "Revamped for StartOS 0.4.0",
  license: "mit",
  replaces: Array<string>("Google search, Duck Duck Go"),
  wrapperRepo: "https://github.com/Start9Labs/searxng-startos",
  upstreamRepo: "https://github.com/searxng/searxng-docker",
  supportSite: "https://github.com/searxng/searxng-docker/issues",
  marketingSite: "https://docs.searxng.org",
  donationUrl: "https://docs.searxng.org/donate.html",
  description: {
    short: "Privacy-preserving internet metasearch engine",
    long: "SearXNG is an Internet metasearch engine that aggregates results from more than 70 search services. It also helps protect your privacy by withholding sensitive metadata from the underlying search services. Your SearXNG instance is highly configurable, and can even be shared with friends and family.",
  },
  assets: {
    license: "LICENSE",
    icon: "assets/icon.svg",
    instructions: "assets/instructions.md",
  },
  volumes: {
    main: "data",
  },
  containers: {
    main: {
      image: "main",
      mounts: {
        main: "/root",
      },
    },
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
});

export type Manifest = typeof manifest;
