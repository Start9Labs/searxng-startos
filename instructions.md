# SearXNG

## Documentation

- [SearXNG documentation](https://docs.searxng.org/) — the upstream admin and user guide covering search syntax, engines, preferences, and configuration.

## What you get on StartOS

- A **Web UI** interface — your private metasearch frontend aggregating results from 70+ search engines.
- A **Stats Dashboard** interface, exported only when you turn stats on, showing usage and engine performance at `/stats`.
- A `?format=json` search endpoint on the same Web UI, suitable as a backend for tools like Open WebUI's web-search feature. From another StartOS service on the same server, queries reach `http://searxng.startos:80/search?q=<query>&format=json`.
- Caddy in front of SearXNG handling security headers, and Valkey behind it for caching — you don't manage either.

## Getting set up

SearXNG posts a critical task after install. You can't start the service until it's done.

1. Run the **Config** task. Set an **Instance Name** for your SearXNG instance and pick a **Primary URL** from the addresses StartOS has assigned to the Web UI (a `.onion` is chosen for you by default). You can also turn on the optional stats dashboard and the Tor outbound proxy here.
2. Start SearXNG and open the **Web UI** interface.

## Using SearXNG

### Web UI

Open the **Web UI** interface to search. Per-user preferences (theme, enabled engines, safe search, language) are set through the cog icon in the SearXNG UI itself and are stored in your browser — they are not part of the StartOS package.

### Actions

- **Config** — change the instance name, switch the primary URL, toggle the stats dashboard, or turn the Tor outbound proxy on or off. Turning the Tor proxy on routes every outgoing search request through the StartOS Tor service (which becomes a required dependency) and enables Tor-only engines like Ahmia and Torch; searches will be slower.
- **Engine API Keys** — add or remove API keys for paid engines (e.g. Brave Search, Wolfram Alpha, Kagi). The **Engine ID** must match the SearXNG engine module name. Adding an entry both supplies the key and activates the engine; removing an entry reverts it to the upstream default. Keys are stored masked.

### Optional: routing search traffic over Tor

Install the **Tor Network Daemon** package first, then run **Config** and turn on **Proxy All Traffic Over Tor**. Tor becomes a required dependency while the toggle is on; turning it back off drops the dependency.
