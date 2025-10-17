FROM valkey/valkey:alpine AS builder

RUN apk add --no-cache yq;\
    mv /usr/bin/yq /usr/local/bin/;\
    rm -f /var/cache/apk/*

FROM searxng/searxng:2025.10.15-576d30ffc AS final

USER root

COPY --chmod=755 docker_entrypoint.sh /usr/local/bin/
COPY --from=builder /usr/local/bin/ /usr/local/bin/
COPY settings.yml /etc/searxng/settings.yml

WORKDIR /usr/local/searxng
