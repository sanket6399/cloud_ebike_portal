import boto3
import os
from uuid import uuid4

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])

def lambda_handler(event, context):
    print(event)
    # Extract bucket name and object key from the Lambda event
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    bucket_size = event['Records'][0]['s3']['object']['size']
    bucket_time = event['Records'][0]['eventTime']
    object_key = event['Records'][0]['s3']['object']['key']
    bucket_size = bucket_size / 1000
    bucket_size = str(bucket_size) + ' KB'
    metadata = {
        'image_size': bucket_size,
        'image_upload_time': bucket_time,
        'image_name': object_key
    }

    # Generate a unique ID for this entry
    image_id = str(uuid4())
    
    # Prepare the item to insert into DynamoDB
    item = {
        'imageId': image_id,
        'metadata info': metadata,
        'bucket name': bucket_name
    }
    
    # Store the metadata in DynamoDB
    table.put_item(Item=item)
    
    return {
        'statusCode': 200,
        'body': 'Successfully stored image metadata in S3 bucket and relocated metadata to dynamodb.'
    }
