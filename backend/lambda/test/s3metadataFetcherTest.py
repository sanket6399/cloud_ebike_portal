import json
import boto3

def lambda_handler(event, context):
    # Initialize the Lambda client
    lambda_client = boto3.client('lambda')

    # Construct the mock S3 event
    test_event = {
        "Records": [
            {
                "s3": {
                    "bucket": {
                        "name": "example-bucket"
                    },
                    "object": {
                        "key": "test_image.jpg",
                        "size": 512
                    }
                },
                "eventTime": "2024-01-01T12:00:00.000Z"
            }
        ]
    }

    # Serialize the event object to a JSON-formatted str, as expected by the Lambda invoke API
    serialized_event = json.dumps(test_event)

    # Invoke the target Lambda function asynchronously
    response = lambda_client.invoke(
        FunctionName='s3metadataFetcherTest',
        InvocationType='Event',  # Use 'RequestResponse' if you want to wait for the execution and get the response
        Payload=serialized_event
    )

    # Optionally, you can inspect the response and logs
    # Note: For InvocationType='Event', the response is mainly for confirming the request was sent successfully
    print("Response:", response)

    return {
        'statusCode': 200,
        'body': json.dumps('Test Lambda executed successfully!')
    }
