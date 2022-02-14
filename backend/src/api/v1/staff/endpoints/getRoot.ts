import { Request, Response } from 'express';

import { getStaff } from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const { params: { staffId } } = req;

    const isCaller = staffId === req.context.userId;

    if (staffId) {
      const data = await getStaff(staffId);

      if (data) {
        let exposedData = (({ firstName, lastName, groups }) => ({
          staffId, firstName, lastName, groups,
        }))(data);

        // Attach more attributes if request is made by the target staff
        if (isCaller) {
          exposedData = {
            ...exposedData,
            ...(({ email, phoneNumber }) => ({
              email, phoneNumber,
            }))(data),
          };
        }

        return res.status(200).json({ data: exposedData });
      }
      return res.status(400).json({ message: 'Staff could not be found' });
    }

    return res.status(400).json({ message: 'Staff ID was not provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Staff could not be retrieved' });
  }
};
