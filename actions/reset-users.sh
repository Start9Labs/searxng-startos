#!/bin/sh

set -e

count=`find /root/.bosgui/ -iname "auth.json" | wc -l`
if [ $count != 0 ]
then
    rm -rf /root/.bosgui/auth.json
    export action_result_running="    {
        \"version\": \"0\",
        \"message\": \"All users reset.\",
        \"value\": null,
        \"copyable\": false,
        \"qr\": false
    }" >/dev/null && echo $action_result_running
else
    export action_result_error="    {
        \"version\": \"0\",
        \"message\": \"No users found.\",
        \"value\": null,
        \"copyable\": false,
        \"qr\": false
    }" >/dev/null && echo $action_result_error
fi
