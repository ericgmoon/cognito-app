import AWS from 'aws-sdk';
import { Request, Response } from 'express';

const { makeId } = require('../utils');

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const { body: { course, startDatetime, host } } = req;

    const id = makeId();

    if (course && startDatetime && host) {
      const params = {
        TableName: 'tutorials',
        Item: {
          course,
          startDatetimeIdentifier: `${startDatetime}#${id}`,
          host,
        },
      };

      const data = await docClient.put(params).promise();

      if (data) return res.status(201).json('Tutorial created');
      return res.status(400).json({ message: 'Tutorial was not created' });
    }
    return res.status(400).json({ message: 'Parameters not provided' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Tutorial was not created' });
  }
};
