FROM --platform=linux/arm64/v8 redis:alpine as redis-builder

FROM --platform=linux/arm64/v8 searxng/searxng:latest as runner

ENV SEARXNG_DEBUG 1
ENV PORT 8080
ENV INSTANCE_NAME SearXNG
ENV AUTOCOMPLETE true
ENV BASE_URL https://searxng.embassy
ENV SEARXNG_BASE_URL https://searxng.embassy

COPY --from=redis-builder /usr/local/bin/* /usr/local/bin/

RUN apk add tini bash git curl sudo
RUN echo "cache2 = name=searxngcache,items=2000,blocks=2000,blocksize=4096,bitmap=1" >> /etc/uwsgi/uwsgi.ini

ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ADD scripts/check-web.sh /usr/local/bin/check-web.sh
RUN chmod a+x /usr/local/bin/*.sh
