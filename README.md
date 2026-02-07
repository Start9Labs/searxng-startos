<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# SearXNG for StartOS

This repository packages [SearXNG](https://github.com/searxng/searxng) for StartOS. This document describes what makes this package different from a default SearXNG deployment.

For general SearXNG usage and features, see the [upstream documentation](https://docs.searxng.org/).

## How This Differs from Upstream

This package runs SearXNG behind a Caddy reverse proxy with security headers, uses Valkey for caching, and is pre-configured for private use (rate limiter disabled). Optional Tor proxy support routes all search requests through StartOS's Tor network.

## Container Runtime

This package runs **3 containers**:

| Container | Image | Purpose |
|-----------|-------|---------|
| searxng | `searxng/searxng:2026.1.30` | Search metaengine |
| caddy | `caddy:2-alpine` | Reverse proxy with security headers |
| valkey | `valkey/valkey:8-alpine` | Redis-compatible caching |

## Volumes

| Volume | Contents | Backed Up |
|--------|----------|-----------|
| `main` | SearXNG settings, Caddy data | Yes |

## Configuration Management

### Auto-Configured Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| `secret_key` | Random 24-char | Session security |
| `limiter` | `false` | Disabled for private instance |
| `image_proxy` | `true` | Proxy images through SearXNG |
| `valkey.url` | Unix socket | Cache connection |
| Security headers | CSP, Permissions-Policy, etc. | Via Caddy |

### User-Configurable Settings

The **Config** action exposes:
- **Instance Name**: Display name for your instance
- **Primary URL**: Base URL for links (selectable from your interfaces)
- **Enable Stats**: Anonymous usage statistics collection
- **Proxy All Traffic Over Tor**: Route search requests through Tor (enables .onion search engines)

## Network Interfaces

| Interface | Type | Port | Path | Description |
|-----------|------|------|------|-------------|
| Web UI | ui | 80 | `/` | Main search interface |
| Stats Dashboard | ui | 80 | `/stats` | Usage statistics (if enabled) |

The Stats Dashboard interface is only exported when "Enable Stats" is turned on.

## Actions

### Config

Configure your SearXNG instance settings:
- Instance name
- Primary URL selection
- Stats collection toggle
- Tor proxy toggle

**Note:** Changing configuration triggers a service restart.

## Dependencies

None. SearXNG queries external search engines directly (or via Tor if enabled).

## Backups

All data is backed up:
- `main` volume - settings, preferences

## Health Checks

| Check | Method | Success Condition |
|-------|--------|-------------------|
| Valkey | CLI ping | Returns "PONG" |
| SearXNG | Port listening | Port 8080 responds |
| Caddy | Port listening | Port 80 responds |

Daemons start in order: Valkey → SearXNG → Caddy

## Tor Proxy Support

When "Proxy All Traffic Over Tor" is enabled:
- All search requests route through `socks5h://10.0.3.1:9050`
- Tor-only engines become available (Ahmia, Torch, etc.)
- Searches are slower but more private
- Your IP is hidden from search engines

## Limitations

1. **No persistent search history**: By design, SearXNG doesn't store search history
2. **Engine availability**: Some search engines may block or rate-limit requests
3. **No user accounts**: SearXNG is designed for anonymous use

## What's Unchanged

- Full SearXNG search functionality
- 70+ search engine support
- Privacy protection features
- Customizable preferences
- Image/video/news/file search categories
- Bang shortcuts (!g, !ddg, etc.)

---

## Quick Reference (YAML)

```yaml
package_id: searxng
upstream_version: 2026.1.30
containers:
  - name: searxng
    image: searxng/searxng:2026.1.30
  - name: caddy
    image: caddy:2-alpine
  - name: valkey
    image: valkey/valkey:8-alpine

volumes:
  main:
    backup: true

interfaces:
  ui:
    type: ui
    port: 80
    path: /
  metrics:
    type: ui
    port: 80
    path: /stats
    conditional: enable_metrics

actions:
  - id: set-config
    name: Config
    has_input: true
    options:
      - instance_name
      - base_url
      - enable_metrics
      - proxy_tor

dependencies: []

auto_configure:
  - secret_key (random)
  - limiter: false
  - image_proxy: true
  - valkey unix socket
  - caddy security headers

health_checks:
  - name: Valkey
    method: cli_ping
  - name: SearXNG
    method: port_listening
    port: 8080
  - name: Caddy
    method: port_listening
    port: 80
```
