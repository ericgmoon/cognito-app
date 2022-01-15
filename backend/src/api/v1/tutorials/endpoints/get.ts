import { Request, Response } from 'express';

import { getTutorial } from '../../utils';

export default async (req: Request, res: Response) => {
  try {
    const { query: { course, startDatetimeIdentifier } } = req;

    if (course && startDatetimeIdentifier) {
      const data = await getTutorial(course, startDatetimeIdentifier);
      return res.status(200).json(data);
    }
    return res.status(400).json({ message: 'Parameters not provided' });
  } catch (err) {
    console.log(err);
    if (err instanceof Error && err.message === 'no tutorial') {
      return res.status(400).json({ message: 'No tutorial found' });
    }
    return res.status(400).json({ message: 'Tutorial could not be retrieved' });
  }
};
