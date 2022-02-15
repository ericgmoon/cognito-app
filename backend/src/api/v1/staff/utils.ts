import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

export const getStaff = async (staffId: any) => {
  const params = {
    TableName: 'staff',
    Key: {
      staffId,
    },
  };

  const data = await docClient.get(params).promise();
  return data?.Item;
};
