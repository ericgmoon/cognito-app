import AWS from 'aws-sdk';
import { Request, Response } from 'express';

import { getStudent } from '../../students/utils';
import { isStudent } from '../../utils';
import { getTutorial } from '../utils';

const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const {
      params: { course, startDatetimeIdentifier },
      body: { studentId },
    } = req;

    if (!isStudent(req)) return res.status(401).json({ message: 'Only students may book tutorials' });
    if (req.context.userId !== studentId) return res.status(401).json({ message: 'Unauthorised action' });

    if (course && startDatetimeIdentifier && studentId) {
      const student = await getStudent(studentId);
      const tutorial = await getTutorial(course, startDatetimeIdentifier);

      if (!student) return res.status(400).json({ message: 'Student not found' });
      if (!tutorial) return res.status(400).json({ message: 'Tutorial not found' });

      // Checks that student hasn't already booked
      if (tutorial?.attendees?.filter((attendee: any) =>
        attendee.studentId === studentId).length > 0) {
        return res.status(400).json({ message: 'Already booked by student' });
      }

      // Checks tutorial is not full
      if (tutorial?.attendees?.length >= tutorial?.capacity) {
        return res.status(400).json({ message: 'Tutorial is full' });
      }

      const attendeeEntry = {
        studentId,
        firstName: student?.firstName,
        lastName: student?.lastName,
      };

      const tutorialKey = {
        course,
        startDatetimeIdentifier,
      };

      const tutorialParams = {
        TableName: 'tutorials',
        Key: {
          course,
          startDatetimeIdentifier,
        },
        UpdateExpression: 'SET attendees = list_append(attendees, :attendee)',
        ExpressionAttributeValues: {
          ':attendee': [attendeeEntry],
        },
      };

      const studentParams = {
        TableName: 'students',
        Key: {
          studentId,
        },
        UpdateExpression: 'SET tutorials = list_append(tutorials, :tutorial)',
        ExpressionAttributeValues: {
          ':tutorial': [tutorialKey],
        },
      };

      // This database operation should be atomic, but DynamoDB does not provide an atomic
      // 'update' operation currently. Should update this if that feature is ever released.
      const updateOutput =
      await Promise.all([
        docClient.update(tutorialParams).promise(),
        docClient.update(studentParams).promise(),
      ]);

      if (updateOutput) return res.status(200).json({ message: 'Tutorial booked' });

      return res.status(400).json({ message: 'Tutorial could not be booked' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    return res.status(400).json({ message: 'Tutorial could not be booked' });
  }
};
