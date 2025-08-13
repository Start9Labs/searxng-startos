FROM valkey/valkey:alpine AS builder

RUN apk add --no-cache yq;\
    mv /usr/bin/yq /usr/local/bin/;\
    rm -f /var/cache/apk/*

FROM searxng/searxng:2025.8.9-935f3fe AS final

USER root

COPY --chmod=755 docker_entrypoint.sh /usr/local/bin/
COPY --from=builder /usr/local/bin/ /usr/local/bin/
COPY settings.yml /etc/searxng/settings.yml

WORKDIR /usr/local/searxng
