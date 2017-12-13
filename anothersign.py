from botocore.signers import CloudFrontSigner
import rsa
import datetime
import sys
print ": ", sys.argv[1]

def rsa_signer(message):
     private_key = open('/Users/mssalehi/git/CloudFrontSingedstuff/pk-APKAJDUHAEYL6L3T4ZUQ.cer', 'r').read()
     return rsa.sign(message, rsa.PrivateKey.load_pkcs1(private_key.encode('utf8')), 'SHA-1')

cf_signer = CloudFrontSigner('APKAJDUHAEYL6L3T4ZUQ', rsa_signer)
signed_url = cf_signer.generate_presigned_url(sys.argv[1],date_less_than=datetime.datetime(2017, 12, 28))
print(signed_url)
