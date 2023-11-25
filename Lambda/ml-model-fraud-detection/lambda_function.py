import boto3 
import json

# Setting environment variables
endpoint_name = 'sagemaker-xgboost-2023-11-25-03-46-27-047'
sagemaker_client = boto3.client('runtime.sagemaker')
sns_client = boto3.client('sns')

def lambda_handler(event, context): 
    data = json.loads(json.dumps(event)) 
    payload = data['data']
    print("Data Received:", payload)
    sagemaker_response = sagemaker_client.invoke_endpoint(EndpointName=endpoint_name,
                                       ContentType='text/csv',
                                       Body=payload) 
    result = json.loads(sagemaker_response['Body'].read().decode())
    
    if (result < 0.5):
        sns_response = sns_client.publish(TopicArn='arn:aws:sns:us-east-2:058263730813:alert-investigator', Message="FRAUD TRANSACTION")
        return null
    else:
        return null
