import AWS from 'aws-sdk';
import { Request, Response } from 'express';

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const { query: { course, startDatetimeIdentifier } } = req;

    if (course && startDatetimeIdentifier) {
      const params = {
        TableName: 'tutorials',
        Key: {
          course,
          startDatetimeIdentifier,
        },
      };

      const data = await docClient.get(params).promise();

      if (data?.Item) {
        return res.status(200).json(data);
      }
      return res.status(400).json({ message: 'No tutorial found' });
    }
    return res.status(400).json({ message: 'Course and startDatetimeIdentifier were not provided' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Tutorial could not be retrieved' });
  }
};
