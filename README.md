<p align="center">
  <img src="icon.svg" alt="SearXNG Logo" width="21%">
</p>

# SearXNG on StartOS

> **Upstream docs:** <https://docs.searxng.org/>
>
> Everything not listed in this document should behave the same as upstream
> SearXNG. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

This repository packages [SearXNG](https://github.com/searxng/searxng) for StartOS. SearXNG is a privacy-respecting, hackable metasearch engine that aggregates results from 70+ search engines.

This package runs SearXNG behind a Caddy reverse proxy with security headers, uses Valkey for caching, and is pre-configured for private use (rate limiter disabled). Optional Tor proxy support routes all search requests through StartOS's Tor network.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

This package runs **3 containers**:

| Container | Image | Purpose |
|-----------|-------|---------|
| searxng | `searxng/searxng` | Search metaengine |
| caddy | `caddy` | Reverse proxy with security headers |
| valkey | `valkey/valkey` | Redis-compatible caching |

- **Architectures:** x86_64, aarch64
- **Entrypoint:** Default upstream entrypoint for SearXNG; default entrypoints for Caddy and Valkey

## Volume and Data Layout

| Volume | Mount Point | Contents |
|--------|-------------|----------|
| `main` | `/etc/searxng` (searxng container), `/data` (caddy container) | SearXNG `settings.yml`, `store.json`, Caddy persistent data |

StartOS manages a `store.json` file and a `settings.yml` file in the `main` volume for persistent configuration.

## Installation and First-Run Flow

- On first install, `settings.yml` is seeded with defaults (auto-generated `secret_key`, `limiter: false`, `image_proxy: true`, Valkey cache URL)
- A **critical setup task** is created prompting the user to run the **Config** action to set instance name and primary URL
- No upstream setup wizard — all configuration is handled via the StartOS Config action

## Configuration Management

| StartOS-Managed | Upstream-Managed |
|-----------------|------------------|
| Instance name, primary URL, stats toggle, Tor proxy toggle (via Config action) | Search preferences, enabled engines, UI theme (via SearXNG web UI) |
| `secret_key`, `limiter`, `image_proxy`, Valkey cache URL (auto-configured) | |
| Caddy security headers (CSP, Permissions-Policy, X-Content-Type-Options, X-Robots-Tag) | |

## Network Access and Interfaces

| Interface | ID | Type | Port | Path | Description |
|-----------|----|------|------|------|-------------|
| Web UI | `ui` | ui | 80 | `/` | Main search interface |
| Stats Dashboard | `metrics` | ui | 80 | `/stats` | Usage statistics (only exported when "Enable Stats" is on) |

## Actions (StartOS UI)

### Config (`set-config`)

Configure your SearXNG instance settings.

| Property | Value |
|----------|-------|
| **Name** | Config |
| **Purpose** | Configure instance name, primary URL, stats collection, and Tor proxy |
| **Visibility** | Enabled |
| **Availability** | Any (running or stopped) |
| **Inputs** | Instance Name (text, required, default: "My SearXNG"), Primary URL (dynamic select from available interfaces), Enable Stats (toggle, default: off), Proxy All Traffic Over Tor (toggle, default: off) |
| **Outputs** | Settings are merged into `settings.yml`; service restarts to apply changes |

## Backups and Restore

- **Backed up:** `main` volume (SearXNG settings, Caddy data)
- **Restore behavior:** Volume is restored in place; service resumes with previous configuration

## Health Checks

| Check | Daemon | Method | Success Condition |
|-------|--------|--------|-------------------|
| Valkey | valkey | CLI ping (`valkey-cli ping`) | Returns "PONG" |
| Web Interface | searxng | Port listening (8080) | Port 8080 responds |
| Caddy | caddy | Port listening (80) | Port 80 responds |

Daemons start in order: Valkey → SearXNG → Caddy

## Dependencies

### Tor (optional)

| Property | Value |
|----------|-------|
| **Service** | Tor Network Daemon |
| **Required/Optional** | Optional — only required when "Proxy All Traffic Over Tor" is enabled |
| **Health checks** | `tor` health check must pass |
| **Mounted volumes** | None |
| **Purpose** | Routes all outgoing search requests through the Tor SOCKS proxy (`socks5h://tor.startos:9050`), enabling Tor-only engines (Ahmia, Torch) and hiding server IP from search engines |

## Limitations and Differences

1. **No persistent search history** — by design, SearXNG does not store search history
2. **Engine availability** — some search engines may block or rate-limit requests
3. **No user accounts** — SearXNG is designed for anonymous use
4. **Rate limiter disabled** — the built-in rate limiter is turned off since this is a private instance
5. **Tor proxy adds latency** — when enabled, all searches route through Tor and will be slower

## What Is Unchanged from Upstream

- Full SearXNG search functionality
- 70+ search engine support
- Privacy protection features
- Customizable preferences via the web UI
- Image/video/news/file search categories
- Bang shortcuts (!g, !ddg, etc.)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: searxng
image: searxng/searxng, caddy, valkey/valkey
architectures: [x86_64, aarch64]
volumes:
  main: /etc/searxng (searxng), /data (caddy)
ports:
  ui: 80
dependencies:
  - tor (optional)
startos_managed_env_vars: []
actions:
  - set-config
```
