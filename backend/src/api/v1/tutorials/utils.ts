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
  return data?.Item;
};

export const removeTutorialFromStudent =
  async (studentId: string, tutorialIndex: number) => {
    // The standard method of using ExpressionAttributeValues to inject the
    // tutorialIndex doesn't seem to work for index values
    const params = {
      TableName: 'students',
      Key: {
        studentId,
      },
      UpdateExpression: `REMOVE tutorials[${tutorialIndex}]`,
    };

    return docClient.update(params).promise();
  };

export const removeAttendeeFromTutorial =
  async (course: string, startDatetimeIdentifier: string, attendeeIndex: number) => {
    // The standard method of using ExpressionAttributeValues to inject the
    // studentIndex doesn't seem to work for index values
    const params = {
      TableName: 'tutorials',
      Key: {
        course,
        startDatetimeIdentifier,
      },
      UpdateExpression: `REMOVE attendees[${attendeeIndex}]`,
    };

    return docClient.update(params).promise();
  };
