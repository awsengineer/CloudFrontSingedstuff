#!/bin/bash

function base64_policy
{
	Base64P=`cat ${PolicyFile}|openssl base64|tr -- '+=/' '-_~'|tr -d "\n"`
	printf "\nCloudFront-Policy=${Base64P}"
	
}

function gen_signature
{
	CfSignature=`cat ${PolicyFile}|openssl sha1 -sign ${PemKey}|openssl base64|tr -- '+=/' '-_~'|tr -d "\n"`
	printf "\nCloudFront-Signature=${CfSignature}"
}

function curl_test
{
	echo "CMD: curl -vvv -o /dev/null -H \"Cookie: CloudFront-Policy=${Base64P}\" -H \"Cookie: CloudFront-Signature=${CfSignature}\" -H \"Cookie: CloudFront-Key-Pair-Id=${CfKeyId}\" ${PoUrl}"	
	curl -vvv -o /dev/null -H "Cookie: CloudFront-Policy=${Base64P}" -H "Cookie: CloudFront-Signature=${CfSignature}" -H "Cookie: CloudFront-Key-Pair-Id=${CfKeyId}" ${PoUrl}	
}

function get_url

{
	PoUrl=`cat ${PolicyFile}|awk -F \" '{print $6}'`
	printf "URL from the policy is ${PoUrl}"
}


if [ $# -lt 3 ]; then
	printf "Not enough arguments!\n"
	printf "Usage: Gen_Signed_Cookies.sh <policy_json> <private_key> <CF-Key-Pair-Id>\n"
else
	PolicyFile=$1
	PemKey=$2
	CfKeyId=$3
	printf "\n============================\n"
	printf "\nPolicy File is ${PolicyFile}"
	printf "\nPrivate Key is ${PemKey}"
	printf "\nCF Key Pair ID is ${CfKeyId}"
	printf "\n============================\n"
	base64_policy
	printf "\n============================\n"
	gen_signature
	printf "\n============================\n"
	get_url
	printf "\n============================\n"
	curl_test
	printf "\n============================\n"
fi
