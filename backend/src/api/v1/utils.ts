import AWS from 'aws-sdk';

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
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

  if (data?.Item) {
    return data;
  }
  throw new Error('no tutorial');
};

export const getStudent = async (gradYear: any, studentId: any) => {
  const params = {
    TableName: 'students',
    Key: {
      gradYear: parseInt(String(gradYear), 10),
      studentId,
    },
  };

  const data = await docClient.get(params).promise();

  if (data?.Item) {
    return data;
  }
  throw new Error('no student');
};
