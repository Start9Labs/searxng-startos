# SearXNG

## Documentation

- [SearXNG documentation](https://docs.searxng.org/) — the upstream admin and user guide covering search syntax, engines, preferences, and configuration.

## What you get on StartOS

- A **Web UI** interface — your private metasearch frontend aggregating results from 70+ search engines.
- A **Stats Dashboard** interface, exported only when you turn stats on, showing usage and engine performance at `/stats`.
- A `?format=json` search endpoint on the same Web UI, suitable as a backend for tools like Open WebUI's web-search feature. From another StartOS service on the same server, queries reach `http://searxng.startos:80/search?q=<query>&format=json`.
- Caddy in front of SearXNG handling security headers, and Valkey behind it for caching — you don't manage either.
- Your instance is **public by default** — anyone with the address can use it. You can optionally require a login (username `admin` plus a password) with the **Manage Access** action; it covers both the Web UI and the Stats Dashboard.

## Getting set up

SearXNG works out of the box — there's no required setup step. On install it picks the defaults "My SearXNG" for the instance name and your `.local` (LAN) address as the primary URL, so you can just **start** SearXNG and open the **Web UI** interface.

To customize, run the **Config** action: set an **Instance Name** and pick a different **Primary URL** from the addresses StartOS has assigned to the Web UI. You can also turn on the optional stats dashboard and the Tor outbound proxy there.

## Using SearXNG

### Web UI

Open the **Web UI** interface to search. Per-user preferences (theme, enabled engines, safe search, language) are set through the cog icon in the SearXNG UI itself and are stored in your browser — they are not part of the StartOS package.

### Actions

- **Config** — change the instance name, switch the primary URL, toggle the stats dashboard, or turn the Tor outbound proxy on or off. Turning the Tor proxy on routes every outgoing search request through the StartOS Tor service (which becomes a required dependency) and enables Tor-only engines like Ahmia and Torch; searches will be slower.
- **Engine API Keys** — add or remove API keys for paid engines (e.g. Brave Search, Wolfram Alpha, Kagi). The **Engine ID** must match the SearXNG engine module name. Adding an entry both supplies the key and activates the engine; removing an entry reverts it to the upstream default. Keys are stored masked.
- **Manage Access** — keep your instance public (the default) or require a login. Switch to **Private** and set a password (use the generate button for a strong random one, or type your own); the username is always `admin`. StartOS enforces the login in front of SearXNG, so it protects both the Web UI and the Stats Dashboard. The new password takes effect without restarting the service. Switch back to **Public** to remove the login.

### Optional: routing search traffic over Tor

Install the **Tor Network Daemon** package first, then run **Config** and turn on **Proxy All Traffic Over Tor**. Tor becomes a required dependency while the toggle is on; turning it back off drops the dependency.
