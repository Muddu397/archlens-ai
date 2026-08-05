import json
import os
import boto3
from prompt import SYSTEM_PROMPT, build_prompt
from validator import parse_response

bedrock = boto3.client(
    "bedrock-runtime",
    region_name="us-east-1"
)

MODEL_ID = os.environ.get("MODEL_ID", "amazon.nova-lite-v1:0")


def lambda_handler(event, context):

    try:

        body = event

        if "body" in event:
            body = json.loads(event["body"])

        project_name = body.get("projectName", "")
        architecture = body.get("architecture", "")
        business_requirements = body.get("businessRequirements", "")

        prompt = build_prompt(
            project_name,
            architecture,
            business_requirements
        )

        response = bedrock.invoke_model(
            modelId=MODEL_ID,
            body=json.dumps({
                "system": [
                    {
                        "text": SYSTEM_PROMPT
                    }
                ],
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": prompt
                            }
                        ]
                    }
                ],
                "inferenceConfig": {
                    "temperature": 0.2,
                    "maxTokens": 3000
                }
            })
        )

        response_body = json.loads(response["body"].read())

        ai_response = response_body["output"]["message"]["content"][0]["text"]

        parsed = parse_response(ai_response)

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps(parsed)
        }

    except Exception as e:

        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": str(e)
            })
        }