# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **`use_default_settings: true` makes `settings.yml` a delta over upstream's.** Every key the model does not declare keeps SearXNG's own value, so adding a key to the shape is a decision to own it forever — check the upstream default first.
- **The Caddyfile and `limiter.toml` are written into container rootfs, not the volume**, so they are regenerated every start and cannot drift. Anything that must persist does not belong there.
