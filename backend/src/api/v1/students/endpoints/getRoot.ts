import { Request, Response } from 'express';

import { getStudent } from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const { params: { gradYear, studentId } } = req;

    console.log(gradYear, studentId);
    if (gradYear && studentId) {
      const data = await getStudent(gradYear, studentId);

      if (data) return res.status(200).json({ data });
      return res.status(400).json({ message: 'Student could not be found' });
    }

    return res.status(400).json({ message: 'Student ID was not provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Student could not be retrieved' });
  }
};
