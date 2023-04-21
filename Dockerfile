FROM redis:alpine as redis-builder

FROM caddy:2-alpine as caddy-builder

FROM searxng/searxng:latest as runner

USER root

RUN apk add tini yq; \
    rm -f /var/cache/apk/*
RUN mkdir -p \
    /var/lib/redis \
    /etc/caddy \
    /data \
    /config \
    /etc/searxng

WORKDIR /etc/
COPY --from=redis-builder /usr/local/bin/ /usr/local/bin/
COPY --from=caddy-builder /etc/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=caddy-builder /data /data
COPY --from=caddy-builder /config /config
COPY settings.yml searxng/settings.yml
COPY searxng.png /usr/local/searxng/searx/static/themes/simple/img/searxng.png
COPY searxng.svg /usr/local/searxng/searx/static/themes/simple/img/searxng.svg

ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/*.sh
