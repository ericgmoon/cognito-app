import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

export const getVideo = async (course: string, videoId: string) => {
  const params = {
    TableName: 'videos',
    Key: {
      course,
      videoId,
    },
  };

  const data = await docClient.get(params).promise();
  return data?.Item;
};
