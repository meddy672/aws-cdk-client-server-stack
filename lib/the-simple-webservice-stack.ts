import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';

import lambda = require('@aws-cdk/aws-lambda');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import apigw = require('@aws-cdk/aws-apigatewayv2');
import integrations = require('@aws-cdk/aws-apigatewayv2-integrations');


export class TheSimpleWebserviceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Configure S3 Bucket for static website hosting
    const myBucket = new s3.Bucket(this, 'meddy672-s3-static-website', {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });

    // Deploy static assets to S3 Bucket
    new s3Deployment.BucketDeployment(this, 'staticWebsite',{
        sources: [s3Deployment.Source.asset('./website')],
        destinationBucket: myBucket,
    });

    // Create a new dynamodb table
    const table = new dynamodb.Table(this, 'Message', {
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
    });

    // Create a lambda function to handle request
    const dynamoLambda = new lambda.Function(this, 'DynamoLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda-fns'), 
      handler: 'lambda.handler',                
      environment: {
        MESSAGE_TABLE_NAME: table.tableName
      }
    });

    // Grant the lambda role read/write permissions to our table
    table.grantReadData(dynamoLambda);

    // Create an API Gateway to receive http requests which are handled by the lambda
    const api = new apigw.HttpApi(this, 'Endpoint', {
      corsPreflight: {
        allowOrigins: ['*'],
        allowMethods: [apigw.CorsHttpMethod.GET]
      },
      defaultIntegration: new integrations.LambdaProxyIntegration({
        handler: dynamoLambda,
      })
    });

    // Show the API Gateway URL in the console
    new cdk.CfnOutput(this, 'HTTP API Url', {
      value: api.url ?? 'Something went wrong with the deploy'
    });
  }
}
