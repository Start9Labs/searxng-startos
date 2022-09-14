#!/bin/bash

set -e

export ULTRA_SECRET_KEY=$(openssl rand -hex 32)

_term() {
  echo "caught SIGTERM signal!"
  kill -TERM "$redis_process" 2>/dev/null
}

# Configuring SearXNG
sed -i "s|ultrasecretkey|$ULTRA_SECRET_KEY|g" /usr/local/searxng/utils/templates/etc/searxng/settings.yml
sed -i "s|ultrasecretkey|$ULTRA_SECRET_KEY|g" /etc/searxng/settings.yml

echo 'Starting Redis...'
redis-server --save "" --appendonly "no" &
redis_process=$!

echo "Starting SearXNG..."
sleep 10
/usr/local/searxng/dockerfiles/docker-entrypoint.sh

trap _term SIGTERM

wait -n $redis_process
