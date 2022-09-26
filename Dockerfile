FROM --platform=linux/arm64/v8 redis:alpine as redis-builder

FROM --platform=linux/arm64/v8 caddy:2-alpine as caddy-builder

FROM --platform=linux/arm64/v8 searxng/searxng:latest as runner

USER root

RUN apk add tini bash git curl sudo yq && \
    rm -f /var/cache/apk/* && \
    mkdir -p /var/lib/redis && mkdir -p /etc/caddy/ && mkdir -p /data && mkdir -p /config

WORKDIR /etc/
COPY searxng-docker/ .

COPY --from=redis-builder /usr/local/bin/ /usr/local/bin/
COPY --from=caddy-builder /etc/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=caddy-builder /data /data
COPY --from=caddy-builder /config /config
COPY searxng-docker/searxng/settings.yml searxng/settings.yml

ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ADD scripts/check-web.sh /usr/local/bin/check-web.sh
RUN chmod a+x /usr/local/bin/*.sh
