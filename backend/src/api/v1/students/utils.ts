import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

export const getStudent = async (studentId: any) => {
  const params = {
    TableName: 'students',
    Key: {
      studentId,
    },
  };

  const data = await docClient.get(params).promise();
  return data?.Item;
};
