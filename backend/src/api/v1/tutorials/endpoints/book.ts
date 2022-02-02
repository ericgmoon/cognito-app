import AWS from 'aws-sdk';
import { Request, Response } from 'express';

import { getStudent, getTutorial } from '../../utils';

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

export default async (req: Request, res: Response) => {
  try {
    const { body: { course, startDatetimeIdentifier, gradYear, studentId } } = req;

    if (course && startDatetimeIdentifier && gradYear &&
      studentId) {
      // Checks that student exists
      const studentData = await getStudent(gradYear, studentId);
      // Checks that tutorial exists
      const tutorialData = await getTutorial(course, startDatetimeIdentifier);
      // Checks that student hasn't already booked
      if (tutorialData.Item && tutorialData.Item.attendees &&
        tutorialData.Item.attendees.filter((student:any) =>
          student.id === studentId).length > 0) {
        return res.status(400).json({ message: 'Student already booked' });
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

      const tutorialBookedData = await docClient.update(tutorialParams).promise();

      if (tutorialBookedData) {
        const studentBookedData = await docClient.update(studentParams).promise();
        if (studentBookedData) return res.status(201).json('Tutorial booked');
      }
      return res.status(400).json({ message: 'Tutorial was not found' });
    }
    return res.status(400).json({ message: 'Parameters not provided' });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      switch (err.message) {
        case 'no tutorial':
          return res.status(400).json({ message: 'No tutorial found' });
        case 'no student':
          return res.status(400).json({ message: 'No student found' });
        default:
          return res.status(400).json({ message: 'An error occurred' });
      }
    }
    return res.status(400).json({ message: 'Tutorial was not booked' });
  }
};
