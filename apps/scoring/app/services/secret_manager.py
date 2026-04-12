import boto3
import os
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv()

class SecretManager:
    @staticmethod
    def get_github_token():
        """
        Retrieves the GitHub token from AWS Secrets Manager or environment variables.
        Demonstrates production-grade secret management.
        """
        secret_name = "openveda/github/token"
        region_name = os.getenv("AWS_REGION", "ap-south-1")

        # Fallback to local env for development
        if os.getenv("NODE_ENV") != "production":
            return os.getenv("GITHUB_TOKEN")

        # Create a Secrets Manager client
        session = boto3.session.Session()
        client = session.client(
            service_name='secretsmanager',
            region_name=region_name
        )

        try:
            get_secret_value_response = client.get_secret_value(
                SecretId=secret_name
            )
        except ClientError as e:
            # Handle specific secret manager errors
            print(f"Error retrieving secret: {e}")
            return os.getenv("GITHUB_TOKEN")

        return get_secret_value_response['SecretString']
