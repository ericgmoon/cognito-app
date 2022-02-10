import AWS from 'aws-sdk';
import { Request, Response } from 'express';

const docClient = new AWS.DynamoDB.DocumentClient();

// Represents the smallest and largest possible id
const MIN_ID = '000000';
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

      if (data) return res.status(200).json({ data });
      return res.status(400).json({ message: 'Tutorials could not be retrieved' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Tutorials could not be retrieved' });
  }
};
