import AWS from 'aws-sdk';
import { Request, Response } from 'express';

import { getStudent } from '../../students/utils';
import { isAdmin } from '../../utils';
import { removeTutorialFromStudent } from '../utils';

const docClient = new AWS.DynamoDB.DocumentClient();

const deleteTutorial = async (course: string, startDatetimeIdentifier: string) => {
  const params = {
    TableName: 'tutorials',
    Key: {
      course,
      startDatetimeIdentifier,
    },
    ReturnValues: 'ALL_OLD',
  };

  const data = await docClient.delete(params).promise();
  return data?.Attributes;
};

interface Attendee {
  studentId: string
}

export default async (req: Request, res: Response) => {
  try {
    const { params: { course, startDatetimeIdentifier } } = req;

    if (!isAdmin(req)) return res.status(401).json({ message: 'Only admins may delete tutorials' });

    if (course && startDatetimeIdentifier) {
      // Delete tutorial
      const deletedTutorial = await deleteTutorial(String(course), String(startDatetimeIdentifier));

      if (deletedTutorial) {
        // Remove tutorial from attendee records
        const { attendees } = deletedTutorial;

        attendees.forEach(async (attendee: Attendee) => {
          const { studentId } = attendee;
          const student = await getStudent(studentId);

          const tutorialIndex = student?.tutorials?.map((x: any) => `${x.course}#${x.startDatetimeIdentifier}`)
            .indexOf(`${course}#${startDatetimeIdentifier}`);
          await removeTutorialFromStudent(studentId, tutorialIndex);
        });

        return res.status(200).json({ message: 'Tutorial deleted' });
      }
      return res.status(400).json({ message: 'Tutorial could not be found' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Tutorial could not be deleted' });
  }
};
