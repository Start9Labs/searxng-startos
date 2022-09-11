FROM --platform=linux/arm64/v8 alexbosworth/balanceofsatoshis as bos-builder

FROM --platform=linux/arm64/v8 niteshbalusu/lndboss as lndboss

USER root
RUN apk add tini bash


ENV BOS_DATA_PATH '/root/.bosgui'
ENV BOS_DEFAULT_SAVED_NODE 'start9'
ENV BOS_DEFAULT_LND_SOCKET 'lnd.embassy:10009'
ENV PATH "/app:$PATH"

COPY --from=bos-builder /app/ /app/ 

ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ADD scripts/check-web.sh /usr/local/bin/check_web.sh
ADD actions/reset-users.sh /usr/local/bin/reset_users.sh
RUN chmod a+x /usr/local/bin/*.sh
