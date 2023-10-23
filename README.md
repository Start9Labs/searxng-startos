<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# SearXNG for StartOS

[SearXNG](https://github.com/searxng/searxng) is a free internet metasearch engine which aggregates results from various search services and databases. Users are neither tracked nor profiled.
This repository creates the `s9pk` package that is installed to run `SearXNG` on [StartOS](https://github.com/Start9Labs/start-os/).

## Dependencies

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [deno](https://deno.land/)
- [make](https://www.gnu.org/software/make/)
- [start-sdk](https://github.com/Start9Labs/start-os/tree/sdk/backend)

## Cloning

Clone the SearXNG package repository locally.

```
git clone git@github.com:Start9Labs/searxng-startos.git
cd searxng-startos
```

## Building

To build the **SearXNG** service as a universal package, run the following command:

```
make
```

Alternatively the package can be built for individual architectures by specifying the architecture as follows:

```
make x86
```

or

```
make arm
```

## Installing (on StartOS)

Before installation, define `host: https://server-name.local` in your `~/.embassy/config.yaml` config file then run the following commands to determine successful install:

> :information_source: Change server-name.local to your Start9 server address

```
start-cli auth login
#Enter your StartOS password
make install
```

**Tip:** You can also install the searxng.s9pk by sideloading it under the **StartOS > System > Sideload a Service** section.

## Verify Install

Go to your StartOS Services page, select **SearXNG**, configure and start the service.

**Done!**
