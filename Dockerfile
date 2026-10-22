ARG IMAGE
FROM ${IMAGE}
# The entrypoint regenerates the bundle from these sources, and the image has no package manager.
RUN rm /usr/share/ca-certificates/mozilla/emSign_ECC_Root_CA_-_G3.crt \
 && update-ca-certificates \
 && ! grep -q MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr /etc/ssl/certs/ca-certificates.crt
