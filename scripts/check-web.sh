#!/bin/bash

DURATION=$(</dev/stdin)
if (($DURATION <= 5000)); then
    exit 60
else
    if curl --silent --fail lndboss.embassy:8055 &>/dev/null; then
        echo "LNDBoss Web UI is unreachable" >&2
        exit 1
    fi
fi