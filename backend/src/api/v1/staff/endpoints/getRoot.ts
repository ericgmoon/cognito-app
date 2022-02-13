import { Request, Response } from 'express';

import { getStaff } from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const { params: { staffId } } = req;

    if (staffId) {
      const data = await getStaff(staffId);

      if (data) return res.status(200).json({ data });
      return res.status(400).json({ message: 'Staff could not be found' });
    }

    return res.status(400).json({ message: 'Staff ID was not provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Staff could not be retrieved' });
  }
};
