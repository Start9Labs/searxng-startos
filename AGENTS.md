# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `searxng`.** SearXNG has no login of its own, so access control is an **OS-level ProxyAuth basic-auth gate**: the Manage Access action stores a password in `store.json`, and `interfaces.ts` enforces it via `addSsl.auth` (`type: 'basic'`) on the bound port — covering both the Web UI and the Stats Dashboard. No password ⇒ public. This is the canonical OS-gate auth pattern; keep it intact.
- **Three subcontainers.** `searxng-sub` (the app, listens on `:8080`), `caddy-sub` (reverse proxy serving the UI interface on `:80`, reaching searxng over `127.0.0.1:8080`), and `valkey-sub` (cache over a `/var/run/valkey.sock` unix socket). Same-package subcontainers share loopback — internal addressing is `127.0.0.1`, not `.startos` DNS or the LXC bridge.
- **Tor SOCKS proxy is written reactively.** The Config action records the user's intent (`outgoing.using_tor_proxy`); `init/watchTorProxy.ts` resolves tor's SOCKS bridge address via the `bridgeAddress` helper in `utils.ts` (`sdk.host.get` on tor's `socks` host — `socksHostId`/`socksPort` imported from `tor-startos/startos/utils`) and writes the `outgoing.proxies` URL into `settings.yml`, reacting to both the toggle and tor appearing/disappearing. No `fallbackPort` here: this proxy anonymizes *all* outbound queries, so when tor is absent the helper resolves `null` and no proxy is written — installing tor later heals in automatically via the `.const()`. (Tor now binds SOCKS 9050 on the internal bridge with no exported interface, so there *is* a host id to read.)

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach searxng -n searxng-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `searxng-sub`, `caddy-sub`, or `valkey-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
