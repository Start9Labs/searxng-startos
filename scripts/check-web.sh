#!/bin/bash

DURATION=$(</dev/stdin)
if (($DURATION <= 5000)); then
    exit 60
else
    curl --silent --fail searxng.embassy:8080 &>/dev/null
    WEB_RES=$?
    if [ $WEB_RES != 0 ]; then
        echo "SearXNG Web UI is unreachable" >&2
        exit 1
    fi
fi