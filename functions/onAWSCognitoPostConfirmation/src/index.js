const AWS = require('aws-sdk');

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  if (event.request.userAttributes.sub) {
    // userAttributes.sub is the AWS Cognito ID of the user
    const params = {
      TableName: 'students',
      Item: {
        gradYear: 2022,
        studentId: event.request.userAttributes.sub,
        username: event.request.userName,
        email: event.request.userAttributes.email,
        phoneNumber: event.request.userAttributes.phone_number,
        createdAt: new Date().getTime(),
      },
    };
    try {
      await docClient.put(params).promise();
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Error: Nothing was written to DynamoDB');
  }

  const response = { statusCode: 200 };
  return response;
};
