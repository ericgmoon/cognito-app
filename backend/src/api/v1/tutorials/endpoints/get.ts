import { Request, Response } from 'express';

import { getTutorial } from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const { query: { course, startDatetimeIdentifier } } = req;

    if (course && startDatetimeIdentifier) {
      const data = await getTutorial(course, startDatetimeIdentifier);
      return res.status(200).json({
        message: 'Tutorial retrieved',
        item: data,
      });
    }

    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) return res.status(400).json({ message: err.message });
    return res.status(400).json({ message: 'Tutorial could not be retrieved' });
  }
};
