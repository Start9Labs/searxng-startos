<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# SearXNG for StartOS

[SearXNG](https://github.com/searxng/searxng) is a free internet metasearch engine which aggregates results from various search services and databases. Users are neither tracked nor profiled.
This repository creates the `s9pk` package that is installed to run `SearXNG` on [StartOS](https://github.com/Start9Labs/start-os/).

## Dependencies

Prior to building the `searxng.s9pk` package, it's essential to configure your build environment for StartOS services. You can find instructions on how to set up the appropriate build environment in the [Packaging Guide](https://staging.docs.start9.com/packaging-guide/).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [make](https://www.gnu.org/software/make/)
- [start-cli](https://github.com/Start9Labs/start-cli/)

## Cloning

Clone the SearXNG package repository locally.

```
git clone https://github.com/Start9Labs/searxng-startos.git
cd searxng-startos
```

## Building

To build the **SearXNG** service as a universal package, run the following command:

```
make
```

## Installing (on StartOS)

Before installation, define `host: https://server-name.local` in your `~/.startos/config.yaml` config file then run the following commands to determine successful install:

> :information_source: Change server-name.local to your Start9 server address

```
make install
```

**Tip:** You can also install the `searxng.s9pk` by using the **Sideload** tab available in the top menu of the StartOS UI.

## Verify Install

Go to your StartOS Services page, select **SearXNG**, configure and start the service.

**Done!**
