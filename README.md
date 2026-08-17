<p align="center">
  <img src="icon.svg" alt="SearXNG Logo" width="21%">
</p>

# SearXNG on StartOS

> Everything not listed in this document should behave the same as upstream
> SearXNG. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[SearXNG](https://github.com/searxng/searxng) is a metasearch engine: it forwards your query to other search engines and returns the merged results without profiling you. This package puts a hardening reverse proxy in front of it, can route every outbound query through Tor, and can put the whole instance behind a login.

- **Upstream repo:** <https://github.com/searxng/searxng>
- **Wrapper repo:** <https://github.com/Start9Labs/searxng-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

Three upstream images, unmodified, run as three daemons in a fixed chain.

| Property      | Value                                       |
| ------------- | ------------------------------------------- |
| Images        | `searxng/searxng`, `caddy`, `valkey/valkey` |
| Architectures | x86_64, aarch64                             |

| Subcontainer  | Daemon    | Starts after | Purpose                                                      |
| ------------- | --------- | ------------ | ------------------------------------------------------------ |
| `valkey-sub`  | `valkey`  | —            | The cache SearXNG needs, over a unix socket                  |
| `searxng-sub` | `searxng` | `valkey`     | SearXNG itself, on an internal port — the one to `attach` to |
| `caddy-sub`   | `caddy`   | `searxng`    | The reverse proxy that actually serves the interface         |

**Caddy, not SearXNG, is what the interface reaches.** SearXNG binds an internal port and Caddy fronts it, adding the security headers upstream's own reference deployment expects — a strict Content-Security-Policy, a `Permissions-Policy` denying every device API, `noindex` robots directives, and compression and cache rules. Running SearXNG unproxied would serve the same search results without any of that.

Two files are written into container root filesystems at start rather than onto a volume: Caddy's `Caddyfile`, generated from the package source so it cannot drift, and an empty `limiter.toml` that suppresses a SearXNG startup warning. Neither persists, and neither is yours to edit.

Valkey runs with persistence disabled entirely — no snapshots, no append-only log — because everything in it is a cache.

## Volume and Data Layout

One volume, mounted into two containers at different points.

| Volume | Mount Point                                    | Purpose                         |
| ------ | ---------------------------------------------- | ------------------------------- |
| `main` | `/etc/searxng` in `searxng-sub`                | `settings.yml` and `store.json` |
| `main` | its `caddy/` subpath at `/data` in `caddy-sub` | Caddy's own state               |

There is no search history, no user database, and no index — SearXNG stores nothing about what you searched for. The volume holds configuration and nothing else of consequence.

## File Models

Two models: SearXNG's settings, and a small store for the one credential the package holds.

| File           | Format | Modelled                | Written by                  |
| -------------- | ------ | ----------------------- | --------------------------- |
| `settings.yml` | YAML   | Yes — `FileHelper.yaml` | Every init, and two actions |
| `store.json`   | JSON   | Yes — `FileHelper.json` | The Manage Access action    |

**`settings.yml` is a delta, not a replacement.** `use_default_settings: true` is enforced, so SearXNG loads its own shipped settings first and merges this file over the top. Anything the file does not mention keeps upstream's value, and the engine list in particular is upstream's — this package does not curate it.

**Enforced** — rewritten whenever the package writes: `use_default_settings`, the Valkey socket URL, `general.debug`, and the two overrides below.

**Derived** — `server.base_url`, and `outgoing.proxies` when Tor is on. Both are reactive: init re-runs and rewrites them when the underlying address changes, and neither is written as a placeholder when it cannot be resolved.

**Seeded once** — `server.secret_key`, a 24-character random value generated on first write.

**Yours** — the instance name, the primary URL, the metrics toggle, the Tor toggle, and per-engine API keys, all through the two configuring actions.

Five settings depart from upstream's defaults:

| Key                        | Here              | Upstream | Why                                                                                   |
| -------------------------- | ----------------- | -------- | ------------------------------------------------------------------------------------- |
| `server.image_proxy`       | `true` (enforced) | `false`  | Result images are fetched by the instance, so the origin never sees your browser      |
| `general.enable_metrics`   | `false`           | `true`   | Off unless you ask for it; turning it on also publishes the Stats Dashboard interface |
| `search.formats`           | `html`, `json`    | `html`   | Enables the JSON API, so other tools can query the instance                           |
| `outgoing.request_timeout` | 3.5 s             | 3.0 s    | A little more headroom for engines reached over a home connection                     |
| `valkey.url`               | a unix socket     | none     | Points SearXNG at the bundled Valkey                                                  |

`store.json` holds only `uiPassword` — present when the instance is private, absent when it is public.

## Dependencies

One, and only while you have asked for it.

| Dependency | Kind      | Required                                | Health check |
| ---------- | --------- | --------------------------------------- | ------------ |
| `tor`      | `running` | Only with Proxy All Traffic Over Tor on | `tor`        |

**The proxy address is resolved, never assumed.** With the toggle on, init reads Tor's SOCKS address over the LXC bridge and writes it into `outgoing.proxies`. If Tor is absent the key is written as nothing at all rather than pointed at a dead port — this proxy anonymises _every_ outbound query, so a broken one must fail closed rather than leak. Installing Tor later heals it without any action here.

## Network Access and Interfaces

One or two interfaces, both on the same port and the same binding.

| Interface       | Id        | Type | Port | Path     | Present when        |
| --------------- | --------- | ---- | ---- | -------- | ------------------- |
| Web UI          | `ui`      | ui   | 80   | `/`      | Always              |
| Stats Dashboard | `metrics` | ui   | 80   | `/stats` | Metrics are enabled |

Neither is masked. The port is bound on the `main` MultiHost, and it is Caddy that answers on it.

**A password turns the binding into an authenticated one.** Setting one through Manage Access adds HTTP basic auth at the StartOS reverse proxy — outside both Caddy and SearXNG — which is why it covers the Stats Dashboard as well as the search UI, and why neither application has to know about it. The username is always `admin`.

## Installation and First-Run Flow

Nothing is required and nothing is revealed. Install seeds the settings file, picks the `.local` address as the base URL, and the instance is usable as soon as it starts. There is no task, no account, and no credential.

Two things are worth deciding early:

- **Public or private.** A fresh install is **public**: anyone who can reach a published address can search through it. That is a reasonable default for a personal instance on a LAN and a poor one for a published address.
- **Tor or not.** Routing outbound queries through Tor stops the upstream engines from seeing your server's address and unlocks the onion-only engines, at the cost of noticeably slower searches.

## Actions

Three actions, all available whether or not the service is running.

### Config

Instance name, primary URL, the metrics toggle, and the Tor toggle.

- **What it changes:** `general.instance_name`, `server.base_url`, `general.enable_metrics`, and `outgoing.using_tor_proxy` in `settings.yml`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent; the form is pre-filled.
- **Enabling metrics adds an interface.** The Stats Dashboard appears on the service page and disappears again when you turn it off.
- **The Tor toggle records intent only.** The actual proxy address is resolved separately, so turning it on before Tor is installed is not an error — it takes effect when Tor appears.

### Engine API Keys

A list of engine-id and API-key pairs, for the search engines that charge for access.

- **What it changes:** the `engines` list in `settings.yml`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent, keyed by engine id. **Removing an entry reverts that engine to upstream's default** rather than disabling it.
- **The engine id must match a real SearXNG engine module.** A typo produces an entry SearXNG ignores, not an error here.

### Manage Access

Public, or private behind a username and password.

- **What it changes:** `uiPassword` in `store.json`, and through it the interface's binding.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent; the form is pre-filled with the current password, and switching to public clears it.
- **Outputs:** on going private, the username and password, masked and copyable.
- **This covers both interfaces**, because it is enforced at the StartOS proxy rather than inside the app.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

Three checks, one per daemon, and only the middle one is shown.

| Check     | Displayed       | Method                         |
| --------- | --------------- | ------------------------------ |
| `valkey`  | Hidden          | `valkey-cli ping`              |
| `searxng` | "Web Interface" | The internal port is listening |
| `caddy`   | Hidden          | Port 80 is listening           |

The two hidden checks still gate the chain: SearXNG will not start until Valkey answers, and Caddy will not start until SearXNG is listening. So a service that is "starting" for a long time is waiting on something below the one check you can see.

A `searxng` failure is the application — most often a `settings.yml` value it rejects, which it names in the service logs. Searches that return no results while every check is green are a different problem: that is the engines being unreachable, which is what to expect if Tor is enabled but not working.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded.

- **Included:** `settings.yml` with the instance name, the engine API keys, and the secret key; `store.json` with the access password; and Caddy's state.
- **Not included:** nothing of substance is missing, because SearXNG keeps no search history, no accounts, and no index.
- **Restore:** complete, and no task is raised. If the restored server publishes different addresses, init replaces the base URL with the `.local` one rather than leaving a dead value.

## Limitations and Differences

1. **A fresh install is public.** Manage Access is opt-in, not a task.
2. **Rate limiting is off.** SearXNG's bot limiter is disabled, so a public instance has nothing throttling automated queries against it.
3. **Search results are served through Caddy**, which adds a strict Content-Security-Policy and related headers. A page or an engine that needs a looser policy has no way to relax it here.
4. **The Tor proxy fails closed.** With the toggle on and Tor absent, no proxy is written — queries do not silently fall back to going out directly.
5. **The engine list is upstream's**, unmodified; only API keys are configurable.
6. **The Stats Dashboard exists only while metrics are enabled**, and metrics are off by default.
7. **The JSON API is enabled**, which upstream leaves off.
8. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: searxng
image: searxng/searxng # plus caddy and valkey/valkey
architectures:
  - x86_64
  - aarch64
subcontainers:
  - valkey-sub # cache, unix socket, no persistence
  - searxng-sub # the application; the one to attach to
  - caddy-sub # reverse proxy; what the interface actually reaches
volumes:
  main: /etc/searxng (searxng-sub); its caddy/ subpath at /data (caddy-sub)
file_models:
  - /etc/searxng/settings.yml
  - store.json
startos_managed_env_vars:
  - PYTHONWARNINGS # searxng-sub
  - HOME # caddy-sub
dependencies:
  - tor # optional, running; only while the Tor proxy toggle is on
interfaces:
  ui: { type: ui, port: 80 }
  metrics: { type: ui, port: 80 } # path /stats; only while metrics are enabled
actions:
  - set-config
  - set-engine-keys
  - manage-access # sets basic auth on the binding, covering both interfaces
tasks: []
health_checks:
  - valkey # hidden
  - searxng # displayed "Web Interface"
  - caddy # hidden
```
