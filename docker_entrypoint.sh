#!/bin/bash

set -e

export SEARXNG_HOSTNAME=$(yq e '.public-host' /root/start9/config.yaml)
export LAN_ADDRESS=$(yq e '.lan-address' /root/start9/config.yaml)
export TOR_ADDRESS=$(yq e '.tor-address' /root/start9/config.yaml)

if [ "$SEARXNG_HOSTNAME" = "null" ]; then 
  SEARXNG_HOSTNAME=$LAN_ADDRESS
fi 

export SEARXNG_HOSTNAME=${SEARXNG_HOSTNAME:-https://$LAN_ADDRESS}
export LETSENCRYPT_EMAIL=$(yq e '.email-address' /root/start9/config.yaml)
export AUTOCOMPLETE=$(yq e '.autocomplete' /root/start9/config.yaml)
export ULTRA_SECRET_KEY=$(openssl rand -hex 32)
export SEARXNG_BASE_URL=https://${SEARXNG_HOSTNAME:-$LAN_ADDRESS}/
export SEARXNG_TLS=${LETSENCRYPT_EMAIL:-internal}


# Configuring SearXNG
sed -i "s|# SEARXNG_HOSTNAME=<host>|SEARXNG_HOSTNAME=$SEARXNG_HOSTNAME|g" .env
sed -i "s|# LETSENCRYPT_EMAIL=<email>|LETSENCRYPT_EMAIL=$LETSENCRYPT_EMAIL|" .env
sed -i "s|ultrasecretkey|$ULTRA_SECRET_KEY|g" searxng/settings.yml
sed -i "s|redis:6379|searxng.embassy:6379|g" searxng/settings.yml

echo 'Starting Redis...'
redis-server --save "" --appendonly "no" &

exec tini -p SIGTERM /usr/local/searxng/dockerfiles/docker-entrypoint.sh
