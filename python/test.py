import boto3
client = boto3.client('cloudfront')
print client.generate_presigned_url("list_distributions", {}, "HTTPS")
