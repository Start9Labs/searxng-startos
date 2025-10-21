import { utils } from '@start9labs/start-sdk'
import { Effects } from '@start9labs/start-sdk/base/lib/Effects'
import { sdk } from './sdk'

export const uiPort = 80

export function randomPassword() {
  return {
    charset: 'a-z,A-Z,0-9',
    len: 24,
  }
}

export const defaultSettings = {
  use_default_settings: true,
  server: {
    secret_key: utils.getDefaultString(randomPassword()), // Uses StartOS password generation
    limiter: false, // can be disabled for a private instance
    image_proxy: true,
    base_url: '',
  },
  ui: {
    static_use_hash: true,
  },
  valkey: {
    url: 'valkey:///var/run/valkey.sock',
  },
  general: {
    debug: false,
    instance_name: 'My SearXNG',
    enable_metrics: false,
  },
  outgoing: {
    request_timeout: 3.5,
  },
}

export async function getPrimaryInterfaceUrls(
  effects: Effects,
): Promise<string[]> {
  const httpInterface = await sdk.serviceInterface.getOwn(effects, 'ui').const()

  return httpInterface?.addressInfo?.urls || []
}
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
	reverse_proxy searxng.startos:8080
}
`.trim()
}
