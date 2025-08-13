#!/bin/sh

set -ea

_term() {
  echo "Caught TERM signal!"
  kill -TERM "$valkey_process" 2>/dev/null
  kill -TERM "$searxng_process" 2>/dev/null
}

export TOR_ONLY=$(yq e '.tor-url' /root/start9/config.yaml)
export SEARXNG_HOSTNAME=$(yq e '.public-host' /root/start9/config.yaml)
export LAN_ADDRESS=$(yq e '.lan-address' /root/start9/config.yaml)
export TOR_ADDRESS=$(yq e '.tor-address' /root/start9/config.yaml)
export LETSENCRYPT_EMAIL=$(yq e '.email-address' /root/start9/config.yaml)
export ENABLE_METRICS=$(yq e '.enable-metrics' /root/start9/config.yaml)
export ULTRA_SECRET_KEY=$(head -c 24 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9')
export INSTANCE_NAME=$(yq e '.instance-name' /root/start9/config.yaml)
if [ "$SEARXNG_HOSTNAME" = "null" ]; then
  SEARXNG_HOSTNAME=$LAN_ADDRESS
fi
export SEARXNG_HOSTNAME=${SEARXNG_HOSTNAME:-https://$LAN_ADDRESS}
export SEARXNG_BASE_URL=https://${SEARXNG_HOSTNAME:-$LAN_ADDRESS}/
if $TOR_ONLY; then
  export SEARXNG_HOSTNAME=http://$TOR_ADDRESS
  export SEARXNG_BASE_URL=http://$TOR_ADDRESS/
fi
export SEARXNG_TLS=${LETSENCRYPT_EMAIL:-internal}
echo "SEARXNG_HOSTNAME=$SEARXNG_HOSTNAME" >/etc/.env
echo "LETSENCRYPT_EMAIL=$LETSENCRYPT_EMAIL" >>/etc/.env
sed -i "s|ultrasecretkey|$ULTRA_SECRET_KEY|g" /etc/searxng/settings.yml
sed -i "s|instance_name: .*|instance_name: $INSTANCE_NAME|g" /etc/searxng/settings.yml
yq e ".general.enable_metrics = $ENABLE_METRICS" -i /etc/searxng/settings.yml
touch /etc/searxng/limiter.toml
touch /root/start9/stats.yaml
echo 'version: 2' >/root/start9/stats.yaml
echo 'data:' >>/root/start9/stats.yaml

printf "\n\n [i] Starting Valkey ...\n"
valkey-server --save "" --appendonly "no" --unixsocket "/var/run/valkey.sock" &
valkey_process=$!

printf "done!\n\n [i] Starting SearXNG ...\n\n"
exec /usr/local/searxng/entrypoint.sh &
searxng_process=$!

trap _term TERM
wait $valkey_process $searxng_process
