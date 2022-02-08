import AWS from 'aws-sdk';
import { Request, Response } from 'express';

import { getStudent } from '../../users/utils';
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
  gradYear: string,
  studentId: string
}

export default async (req: Request, res: Response) => {
  try {
    const { query: { course, startDatetimeIdentifier } } = req;

    if (course && startDatetimeIdentifier) {
      // Delete tutorial
      const deletedTutorial = await deleteTutorial(String(course), String(startDatetimeIdentifier));

      if (deletedTutorial) {
        // Remove tutorial from attendee records
        const { attendees } = deletedTutorial;

        attendees.forEach(async (attendee: Attendee) => {
          const { gradYear, studentId } = attendee;
          const student = await getStudent(gradYear, studentId);

          const tutorialIndex = student?.tutorials?.map((x: any) => `${x.course}#${x.startDatetimeIdentifier}`)
            .indexOf(`${course}#${startDatetimeIdentifier}`);
          await removeTutorialFromStudent(gradYear, studentId, tutorialIndex);
        });

        return res.status(200).json({ message: 'Tutorial deleted' });
      }
      return res.status(400).json({ message: 'Tutorial could not be found' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Tutorial could not be deleted' });
  }
};
