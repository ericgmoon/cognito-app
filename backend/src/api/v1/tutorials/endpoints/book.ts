import AWS from 'aws-sdk';
import { Request, Response } from 'express';

import { getStudent } from '../../users/utils';
import { getTutorial } from '../utils';

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const { body: { course, startDatetimeIdentifier, gradYear, studentId } } = req;

    if (course && startDatetimeIdentifier && gradYear &&
      studentId) {
      const studentData = await getStudent(gradYear, studentId);
      const tutorialData = await getTutorial(course, startDatetimeIdentifier);

      if (!studentData) throw Error('Student not found');
      if (!tutorialData) throw Error('Tutorial not found');

      // Checks that student hasn't already booked
      if (tutorialData.Item?.attendees?.filter((student:any) =>
        student.id === studentId).length > 0) {
        return res.status(400).json({ message: 'Already booked by student' });
      }

      const attendee = {
        id: studentId,
        firstName: studentData?.Item?.firstName,
        lastName: studentData?.Item?.lastName,
      };

      const tutorial = {
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
          ':attendee': [attendee],
        },
      };

      const studentParams = {
        TableName: 'students',
        Key: {
          gradYear: parseInt(String(gradYear), 10),
          studentId,
        },
        UpdateExpression: 'SET tutorials = list_append(tutorials, :tutorial)',
        ExpressionAttributeValues: {
          ':tutorial': [tutorial],
        },
      };

      // This database operation should be atomic, but DynamoDB does not provide an atomic
      // 'update' operation currently. Should update this if that feature is ever released.
      const updateOutput =
      await Promise.all([
        docClient.update(tutorialParams).promise(),
        docClient.update(studentParams).promise(),
      ]);

      if (updateOutput) return res.status(200).json('Tutorial booked');

      return res.status(400).json({ message: 'Tutorial could not be booked' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(400).json({ message: 'Tutorial could not be booked' });
  }
};
