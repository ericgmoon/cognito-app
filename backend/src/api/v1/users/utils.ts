import AWS from 'aws-sdk';

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
  return data?.Item;
};
