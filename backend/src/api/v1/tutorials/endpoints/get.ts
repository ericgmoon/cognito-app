import { Request, Response } from 'express';

import { getTutorial } from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const { query: { course, startDatetimeIdentifier } } = req;

    if (course && startDatetimeIdentifier) {
      const data = await getTutorial(course, startDatetimeIdentifier);
      if (data) {
        return res.status(200).json({
          message: 'Tutorial retrieved',
          data,
        });
      }
      return res.status(400).json({ message: 'Tutorial could not be found' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Tutorial could not be retrieved' });
  }
};
