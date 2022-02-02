import AWS from 'aws-sdk';
import { Request, Response } from 'express';

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

// Represents smallest possible id
const MIN_ID = '000000';

// Represents largest possible id
const MAX_ID = 'zzzzzz';

export default async (req: Request, res: Response) => {
  try {
    const { query: { startDatetime, endDatetime, course } } = req;

    if (startDatetime && endDatetime && course) {
      const params = {
        TableName: 'tutorials',
        KeyConditionExpression: 'course = :course AND startDatetimeIdentifier BETWEEN :start AND :end',
        ExpressionAttributeValues: {
          ':course': course,
          ':start': `${startDatetime}#${MIN_ID}`,
          ':end': `${endDatetime}#${MAX_ID}`,
        },
      };

      const data = await docClient.query(params).promise();

      if (data) return res.status(200).json(data);
      return res.status(400).json({ message: 'Something went wrong' });
    }
    return res.status(400).json({ message: 'Parameters not provided' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Tutorials could not be retrieved' });
  }
};
