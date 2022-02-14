import AWS from 'aws-sdk';
import { Request, Response } from 'express';

import { isAdmin, isTutor } from '../../utils';
import { makeId } from '../utils';

const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const { body: { course, startDatetime, host, description, capacity = 3, duration = 30 } } = req;

    if (!isAdmin(req) && !isTutor(req)) return res.status(401).json({ message: 'Only admins & tutors may create tutorials' });

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

      if (data) {
        return res.status(201).json({
          message: `Created tutorial at ${startDatetime}`,
          data: {
            course,
            startDatetimeIdentifier: `${startDatetime}#${id}`,
            description,
            host,
            capacity,
            duration,
            attendees: [],
          },
        });
      }
      return res.status(400).json({ message: 'Tutorial could not be created' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Tutorial could not be created' });
  }
};
