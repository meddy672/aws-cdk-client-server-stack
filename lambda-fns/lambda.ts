const { DynamoDB, Lambda } = require('aws-sdk');

// create database object
const dynamo = new DynamoDB();
  
exports.handler = async function(event:any) {
console.log(event)

  try {
    
    // get data from the database
    const res = await dynamo.getItem({
      TableName: process.env.MESSAGE_TABLE_NAME,
      Key: { path: { S: event.rawPath } },
      ProjectionExpression: "message"
    }).promise();

    const message = res.Item.message.S;
    return sendRes(200, message);

   } catch (error: any) {
    console.log(error);
    return sendRes(500, 'Internal server error');
   }

};

const sendRes = (status:number, message: string) => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin":"*"
    },
    body: message
  };
};