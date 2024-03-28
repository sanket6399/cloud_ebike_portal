# AWS Static Website Image Upload and Metadata Storage

## Overview

This project consists of a static website hosted on AWS, which allows users to upload images to an S3 bucket. Upon upload, an AWS Lambda function is triggered to extract image metadata and store it in a DynamoDB table. The application is built using AWS Amplify, with AWS Cognito for authentication and Amazon CloudWatch for logging.

## Architecture Diagram
![Alt text](https://drive.google.com/file/d/1A5MFjcePI-Mbiba6Rw7HMBpsWzYcH5TK/view?usp=drive_link)
## Architecture Description

The application integrates several AWS services to provide a seamless image upload and metadata storage experience:

1. **Frontend Web App**: Interface for uploading images.
2. **AWS Amplify**: Hosts and deploys the static website.
3. **AWS Cognito**: Handles user authentication.
4. **Amazon S3**: Stores uploaded images.
5. **AWS Lambda**: Processes images and extracts metadata upon upload.
6. **Amazon DynamoDB**: Stores image metadata as key-value pairs.
7. **Amazon CloudWatch**: Logs and monitors the application.

## Setup Instructions

### Prerequisites

- An active AWS account.
- The AWS CLI installed and configured.

### Configuration Steps

1. **Frontend Setup**
   - Deploy the static site via AWS Amplify.
   - Set up AWS Cognito for user authentication.

2. **S3 Configuration**
   - Create and configure an S3 bucket for image storage.

3. **Lambda Function Deployment**
   - Write the Lambda function to extract metadata (`s3metadataFetcher.py`).
   - Upload the function to AWS Lambda using the AWS CLI.

   ```bash
   aws lambda create-function --function-name s3metadataFetcher \
   --runtime python3.8 --role [ROLE-ARN] --handler s3metadataFetcher.lambda_handler \
   --zip-file fileb://s3metadataFetcher.zip

## DynamoDB Table Creation

- Create a DynamoDB table for storing metadata.

## CloudWatch Monitoring

- Configure CloudWatch for operational monitoring and logging. Attach proper role and policies

## Setting Up Triggers

- Configure S3 to trigger the Lambda function on image upload.

## Testing

- Test Lambda function with `s3metadataFetcherTest.py`.

## Monitoring Setup

- Use CloudWatch to monitor application health and set up alerts.


## Additional Information

- AWS SAM is not utilized in this project; manual upload of Lambda function code is required.
- Consult the [AWS documentation](https://aws.amazon.com/documentation/) for detailed guides on each service.



