# Contributing

This repo packages [SearXNG](https://github.com/searxng/searxng) for StartOS.

## Documentation — keep it in sync

- **`README.md`** — what this package is and how it's built (image, volumes, interfaces). For developers and AI assistants.
- **`instructions.md`** — the user-facing instructions packed into the `.s9pk` and shown on the **Instructions** tab in StartOS, for the person running the service.
- **`CONTRIBUTING.md`** — this file.
- **`CLAUDE.md`** — operating rules for AI developers working in this repo.

**Any code change that warrants it must update `README.md` and `instructions.md` in the same change** — a new or renamed action, an added or removed volume / port / interface / dependency, a changed default, a new limitation, any altered user-visible behavior. Don't defer: a package that ships with a stale README or stale instructions is not done, even if the code is perfect. Content rules live in the packaging guide: [Writing READMEs](https://docs.start9.com/packaging/writing-readmes.html) and [Writing Service Instructions](https://docs.start9.com/packaging/writing-instructions.html).

## Building

See the [StartOS Packaging Guide](https://docs.start9.com/packaging/) for environment setup, then:

```bash
npm ci    # install dependencies
make      # build the universal .s9pk
```

## Updating the upstream version

SearXNG runs the upstream `searxng/searxng` Docker image. Tags on Docker Hub are formatted `<calendar version>-<git short hash>` (e.g. `2026.5.10-df1f24fb7`). The bundled Caddy and Valkey sidecars track their own upstream images independently.

1. Find the new tag on [Docker Hub](https://hub.docker.com/r/searxng/searxng/tags) — copy the full `<version>-<hash>` string.
2. Bump the `searxng` entry's `dockerTag` in `startos/manifest/index.ts` to `searxng/searxng:<new tag>`.
3. Update `version` and `releaseNotes` in the file under `startos/versions/`, renaming it to match the new version. A *new* version file is only needed when the bump carries an `up`/`down` migration, or when you want the old release notes preserved in git history — see [Versions](https://docs.start9.com/packaging/versions.html).
4. If you're also refreshing Caddy or Valkey, bump their `dockerTag` entries in the same file.
5. Rebuild (`make`), sideload the `.s9pk`, and confirm it starts.
6. Review `README.md` and `instructions.md` for anything the bump changed.

## How to contribute

1. Fork the repository and create a branch from `master`.
2. Make your changes — including the doc updates above.
3. Open a pull request to `master`.
