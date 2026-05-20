# Updating the upstream version

SearXNG bundles three upstream Docker images — `searxng/searxng` (the search engine), `valkey/valkey` (cache), and `caddy` (reverse proxy). All three are pinned in `startos/manifest/index.ts`; the SearXNG image is the primary thing to track, the sidecars are rolling major-version tags that only need attention when their major bumps.

## Determining the upstream version

### SearXNG — `searxng/searxng` (Docker Hub)

[searxng/searxng on Docker Hub](https://hub.docker.com/r/searxng/searxng/tags) · [searxng/searxng on GitHub](https://github.com/searxng/searxng)

SearXNG does **not** cut GitHub releases or tags — the project ships continuously by publishing dated Docker images. Tags are formatted `<YYYY.M.D>-<git-short-hash>` (e.g. `2026.5.13-8e5aa9d39`). The newest non-`latest` tag on Docker Hub is the upstream version.

```sh
curl -fsSL "https://hub.docker.com/v2/repositories/searxng/searxng/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name' | grep -v '^latest$' | head -1
```

Pinned in `startos/manifest/index.ts` as `images.searxng.source.dockerTag`.

### Valkey — `valkey/valkey` (Docker Hub, tracked via GitHub releases)

[valkey-io/valkey releases](https://github.com/valkey-io/valkey/releases) · [valkey/valkey on Docker Hub](https://hub.docker.com/r/valkey/valkey/tags)

The manifest pins the rolling major tag `valkey/valkey:8-alpine`, so Docker pulls the latest 8.x point release automatically and a bump is only required when Valkey's major version changes (8 → 9 → …) or when we deliberately want to pin to a specific point release. Watch upstream GitHub releases for the current major:

```sh
gh release view -R valkey-io/valkey --json tagName -q .tagName
```

Pinned in `startos/manifest/index.ts` as `images.valkey.source.dockerTag`.

### Caddy — `caddy` (Docker Hub, tracked via GitHub releases)

[caddyserver/caddy releases](https://github.com/caddyserver/caddy/releases) · [caddy on Docker Hub](https://hub.docker.com/_/caddy/tags)

The manifest pins the rolling major tag `caddy:2-alpine`, so the latest 2.x point release is pulled automatically and a bump is only required when Caddy's major version changes (2 → 3 → …) or when we deliberately want to pin. Watch upstream GitHub releases:

```sh
gh release view -R caddyserver/caddy --json tagName -q .tagName
```

Pinned in `startos/manifest/index.ts` as `images.caddy.source.dockerTag`.

## Applying the bump

All three pins live in `startos/manifest/index.ts`. Edit the relevant `dockerTag` string under `images.<name>.source`:

- **SearXNG**: set `images.searxng.source.dockerTag` to `searxng/searxng:<YYYY.M.D>-<hash>` using the full tag string copied from Docker Hub.
- **Valkey** (only when changing major or pinning a point release): set `images.valkey.source.dockerTag` to e.g. `valkey/valkey:9-alpine`.
- **Caddy** (only when changing major or pinning a point release): set `images.caddy.source.dockerTag` to e.g. `caddy:3-alpine`.

Then bump `version` and `releaseNotes` in `startos/versions/index.ts` (or the current version file) per the standard packaging conventions.
