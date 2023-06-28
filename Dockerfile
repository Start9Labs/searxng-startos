FROM redis:alpine as redis-builder

FROM searxng/searxng:2023.6.28-401561cb

USER root

RUN apk add tini yq; \
    rm -f /var/cache/apk/*
RUN mkdir -p \
    /var/lib/redis \
    /etc/searxng

WORKDIR /etc/
COPY --from=redis-builder /usr/local/bin/ /usr/local/bin/
COPY settings.yml searxng/settings.yml
ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/*.sh
