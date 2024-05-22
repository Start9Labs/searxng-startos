FROM redis:alpine as redis

FROM searxng/searxng:2024.5.17-ec41b5358

USER root

RUN apk add --no-cache yq; \
    rm -f /var/cache/apk/*
RUN mkdir -p \
    /var/lib/redis \
    /etc/searxng

WORKDIR /etc/
COPY --chmod=755 docker_entrypoint.sh /usr/local/bin/
COPY --from=redis /usr/local/bin/ /usr/local/bin/
COPY settings.yml searxng/settings.yml
