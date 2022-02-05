import AWS from 'aws-sdk';
import { Request, Response } from 'express';

import { makeId } from '../utils';

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const { body: { course, startDatetime, host, description, capacity = 3, duration = 30 } } = req;

    const id = makeId();

    if (course && startDatetime && host) {
      const params = {
        TableName: 'tutorials',
        Item: {
          course,
          startDatetimeIdentifier: `${startDatetime}#${id}`,
          description,
          host,
          capacity,
          duration,
          attendees: [],
        },
      };

      const data = await docClient.put(params).promise();

      if (data) return res.status(201).json(`Created tutorial at ${startDatetime}`);
      return res.status(400).json({ message: 'Tutorial could not be created' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Tutorial could not be created' });
  }
};
