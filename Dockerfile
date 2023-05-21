FROM redis:alpine as redis-builder

FROM searxng/searxng:2023.6.28-401561cb

USER root

RUN mkdir -p \
    /var/lib/redis \
    /data \
    /config \
    /etc/searxng

WORKDIR /etc/
COPY --from=redis-builder /usr/local/bin/ /usr/local/bin/
