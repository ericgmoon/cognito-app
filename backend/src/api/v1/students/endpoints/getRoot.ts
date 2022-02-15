import { Request, Response } from 'express';

import { getStudent } from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const { params: { gradYear, studentId } } = req;

    const isCaller = studentId === req.context.userId;

    if (gradYear && studentId) {
      const data = await getStudent(gradYear, studentId);

      if (data) {
        let exposedData = (({ firstName, lastName, tutorials }) =>
          ({
            gradYear, studentId, firstName, lastName, tutorials,
          }))(data);

        // Attach more attributes if request is made by the target student
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
      return res.status(400).json({ message: 'Student could not be found' });
    }

    return res.status(400).json({ message: 'Student ID was not provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Student could not be retrieved' });
  }
};
