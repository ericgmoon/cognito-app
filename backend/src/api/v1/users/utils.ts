import AWS from 'aws-sdk';

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

export const getStudent = async (gradYear: any, studentId: any) => {
  const params = {
    TableName: 'students',
    Key: {
      gradYear: parseInt(String(gradYear), 10),
      studentId,
    },
  };

  const data = await docClient.get(params).promise();

  if (data?.Item) return data;

  return null;
};
