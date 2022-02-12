import AWS from 'aws-sdk';
import { Request, Response } from 'express';

const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const { query: { phoneNumber } } = req;

    if (phoneNumber) {
      // Check if phoneNumber is listed in the approvedAccounts table
      const params = {
        TableName: 'approvedAccounts',
        Key: { phoneNumber },
      };

      const data = await docClient.get(params).promise();

      if (data.Item) return res.status(200).json({ data: data.Item });
      return res.status(400).json({ message: 'Phone number is not validated' });
    }

    return res.status(400).json({ message: 'Phone number was not provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Student could not be validated' });
  }
};
