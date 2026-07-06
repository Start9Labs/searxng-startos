import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

/**
 * Bridge address (`10.0.3.1:<assigned external port>`) of a dependency's
 * binding, as a minimal reactive value. Chain `.const()` in main — or, as
 * here, in an init watcher that feeds a file model main watches: the mapped
 * string only changes when the address itself does, so the dependent restarts
 * exactly on dependency install/uninstall/port-change and never on dependency
 * updates. Chain `.once()` in an action context. `fallbackPort` keeps the
 * value non-null while the dependency is absent — sanctioned only for tor's
 * allocator-guaranteed SOCKS 9050. Drop-in for the planned SDK
 * `sdk.host.getBridgeAddress` helper.
 */
export function bridgeAddress(
  effects: T.Effects,
  opts: {
    packageId: string
    hostId: string
    internalPort: number
    fallbackPort: number
  },
): { const(): Promise<string>; once(): Promise<string> }
export function bridgeAddress(
  effects: T.Effects,
  opts: { packageId: string; hostId: string; internalPort: number },
): { const(): Promise<string | null>; once(): Promise<string | null> }
export function bridgeAddress(
  effects: T.Effects,
  opts: {
    packageId: string
    hostId: string
    internalPort: number
    fallbackPort?: number
  },
) {
  const watchable = async () => {
    const osIp = await sdk.getOsIp(effects)
    return sdk.host.get(
      effects,
      { packageId: opts.packageId, hostId: opts.hostId },
      (host) => {
        const port =
          host?.bindings[opts.internalPort]?.net.assignedPort ??
          opts.fallbackPort
        if (port == null) return null
        return `${osIp}:${port}`
      },
    )
  }
  return {
    const: async () => (await watchable()).const(),
    once: async () => (await watchable()).once(),
  }
}

export const uiPort = 80

export const uiUsername = 'admin'

export const getCaddyfile = (): string => {
  return `
{
	admin off
	log {
		output stdout
		level INFO
	}
	servers {
		client_ip_headers X-Forwarded-For X-Real-IP
		trusted_proxies static private_ranges
	}
}

:${uiPort} {
	encode zstd gzip

	@api {
		path /config
		path /healthz
		path /stats/errors
		path /stats/checker
	}

	@static {
		path /static/*
	}

	@imageproxy {
		path /image_proxy
	}

	header {
		Content-Security-Policy "upgrade-insecure-requests; default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; form-action 'self' https:; font-src * data:; frame-ancestors 'self'; base-uri 'self'; connect-src 'self'; img-src * data:; frame-src https:;"
		Permissions-Policy "accelerometer=(),camera=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),payment=(),usb=()"
		Referrer-Policy "same-origin"
		X-Content-Type-Options "nosniff"
		X-Robots-Tag "noindex, nofollow, noarchive, nositelinkssearchbox, nosnippet, notranslate, noimageindex"
		-Server
	}

	header @api {
		Access-Control-Allow-Methods "GET, OPTIONS"
		Access-Control-Allow-Origin "*"
	}

	route {
		header Cache-Control "no-cache"
		header @static Cache-Control "public, max-age=30, stale-while-revalidate=60"
		header @imageproxy Cache-Control "public, max-age=3600"
	}

	# Simple reverse proxy without health checks
	reverse_proxy 127.0.0.1:8080
}
`.trim()
}
