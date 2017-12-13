import boto3
import datetime

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from botocore.signers import CloudFrontSigner


def rsa_signer(message):
    with open('/Users/mssalehi/codes/python/pk-APKAJSL6VHJTQHIAWGSQ.cer', 'rb') as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )
    signer = private_key.signer(padding.PKCS1v15(), hashes.SHA1())
    signer.update(message)
    return signer.finalize()

key_id = 'APKAIMN2TXDRB53WEPFQ'
url = 'https://d2uddwg2af5wil.cloudfront.net/naghme.html'
expire_date = datetime.datetime(2017, 11, 1)

cloudfront_signer = CloudFrontSigner(key_id, rsa_signer)

# Create a signed url that will be valid until the specfic expiry date
# provided using a canned policy.
signed_url = cloudfront_signer.generate_presigned_url(
    url, date_less_than=expire_date)
#print(signed_url)


client = boto3.client('cloudfront')
signed_url2 = client.generate_presigned_url("list_distributions", {}, 3600, "HTTPS")
signed_url3 = client.generate_presigned_url('list_distributions',{}, 100, 'HTTPS')
signed_url4 = client.generate_presigned_url("list_distributions", Params={}, ExpiresIn=3600, HttpMethod="HTTPS")

#print signed_url2
print signed_url4
