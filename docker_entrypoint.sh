#!/bin/bash

set -e

# Configuring SearXNG
echo 'Configuring SearXNG...'
export SEARXNG_HOSTNAME=$(yq e '.public-host' /root/start9/config.yaml)
export LAN_ADDRESS=$(yq e '.lan-address' /root/start9/config.yaml)
export TOR_ADDRESS=$(yq e '.tor-address' /root/start9/config.yaml)
export LETSENCRYPT_EMAIL=$(yq e '.email-address' /root/start9/config.yaml)
export AUTOCOMPLETE=$(yq e '.autocomplete' /root/start9/config.yaml)
export ENABLE_METRICS=$(yq e '.enable-metrics' /root/start9/config.yaml)
export ULTRA_SECRET_KEY=$(openssl rand -hex 32)
if [ "$SEARXNG_HOSTNAME" = "null" ]; then 
  SEARXNG_HOSTNAME=$LAN_ADDRESS
fi 
export SEARXNG_HOSTNAME=${SEARXNG_HOSTNAME:-https://$LAN_ADDRESS}
export SEARXNG_BASE_URL=https://${SEARXNG_HOSTNAME:-$LAN_ADDRESS}/
export SEARXNG_TLS=${LETSENCRYPT_EMAIL:-internal}
sed -i "s|# SEARXNG_HOSTNAME=<host>|SEARXNG_HOSTNAME=$SEARXNG_HOSTNAME|g" .env
sed -i "s|# LETSENCRYPT_EMAIL=<email>|LETSENCRYPT_EMAIL=$LETSENCRYPT_EMAIL|" .env
sed -i "s|ultrasecretkey|$ULTRA_SECRET_KEY|g" searxng/settings.yml
if $AUTOCOMPLETE; then 
  sed -i 's|autocomplete: false|autocomplete: "duckduckgo"|g' searxng/settings.yml
fi
if $ENABLE_METRICS; then 
  sed -i 's|enable_metrics: false|enable_metrics: true|g' searxng/settings.yml
fi

# Initializing Database
echo 'Starting Redis...'
redis-server --save "" --appendonly "no" &

# Starting SearXNG
exec tini -p SIGTERM /usr/local/searxng/dockerfiles/docker-entrypoint.sh
