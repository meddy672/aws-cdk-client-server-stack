# Basic Client Serverless
[See Demo](http://thesimplewebservicestack-meddy672s3staticwebsite5-16j9bwu3gzk60.s3-website-us-east-1.amazonaws.com/)

This is a basic client-server CDK stack. The stack has a S3 bucket which is configured to host a static website, an API Gateway and Lambda function to handle HTTP request, and a DynamoDB that contains the data. This is the most basic of implementations and would have to be hardened before production use.

## AWS Services

1. API Gateway
2. DynamoDB
3. Lambda
4. S3

![Architecture](img/architecture.png)

## Required Software
1. [Node.js](https://nodejs.org/en/)
2. [AWS CLI](https://aws.amazon.com/cli/)
3. [AWS CDK](https://aws.amazon.com/solutions/constructs/patterns/?constructs-master-cards.sort-by=item.additionalFields.headline&constructs-master-cards.sort-order=asc&awsf.constructs-master-filter-tech-categories=*all&awsf.constructs-master-filter-products=*all)

## Usage
To use this code, just install the software and update your bucket name, and if you would like, change the table name. You will also need to add some items to your database. After deployment you should have a bucket with a URL you can visit which will fetch data from the database and display it to the user. 

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `npm run deploy`  deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
