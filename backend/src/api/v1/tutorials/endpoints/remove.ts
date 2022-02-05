import AWS from 'aws-sdk';
import { Request, Response } from 'express';

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
        ReturnValues: 'ALL_OLD',
      };

      const data = await docClient.delete(params).promise();

      if (data?.Attributes) {
        return res.status(200).json({ message: 'Tutorial deleted' });
      }
      return res.status(400).json({ message: 'Tutorial could not be found' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Tutorial could not be deleted' });
  }
};
