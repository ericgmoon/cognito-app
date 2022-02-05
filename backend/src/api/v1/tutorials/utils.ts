import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const makeId = () => {
  let id = '';

  for (let i = 0; i < 5; i++) {
    id += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }

  return id;
};

export const getTutorial = async (course: any, startDatetimeIdentifier: any) => {
  const params = {
    TableName: 'tutorials',
    Key: {
      course,
      startDatetimeIdentifier,
    },
  };

  const data = await docClient.get(params).promise();

  if (data?.Item) return data;

  return null;
};
