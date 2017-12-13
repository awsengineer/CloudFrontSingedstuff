#!/bin/bash
# USER VARIABLES

url_to_sign="https://d26zdvjo97enw7.cloudfront.net/private/test"
cf_private_key_file="/Users/mssalehi/code/CloudFrontSingedCookies/pk-APKAJDUHAEYL6L3T4ZUQ.cer"
cf_keypair_id="APKAJDUHAEYL6L3T4ZUQ"
policy_file="policy.json"

# DO NOT CHANGE THE FOLLOWING VARIABLES

cf_policy_cookie="$(cat $policy_file | tr -d " \t\n\r" | base64 | tr '+=/' '-_~' | tr -d " \t\n\r")"
cf_signature_cookie="$(cat $policy_file | tr -d " \t\n\r" | openssl sha1 -sign $cf_private_key_file | base64 | tr '+=/' '-_~' | tr -d " \t\n\r")"

# BUILDING THE CURL COMMAND OUTPUT

printf "\n"
printf "CloudFront Signed Cookies cURL command:\n"
printf "============================\n"
printf "curl -I -H 'Cookie: CloudFront-Policy=$cf_policy_cookie' -H 'Cookie: CloudFront-Signature=$cf_signature_cookie'  -H 'Cookie: CloudFront-Key-Pair-Id=$cf_keypair_id' $url_to_sign\n"
printf "============================\n"
#clear
echo "$url_to_sign"
curl -I -H 'Cookie: CloudFront-Policy=$cf_policy_cookie' -H 'Cookie: CloudFront-Signature=$cf_signature_cookie'  -H 'Cookie: CloudFront-Key-Pair-Id=$cf_keypair_id' $url_to_sign
