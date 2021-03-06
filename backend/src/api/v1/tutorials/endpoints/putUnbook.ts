import { Request, Response } from 'express';

import { getStudent } from '../../students/utils';
import { isStudent } from '../../utils';
import {
  getTutorial, removeAttendeeFromTutorial, removeTutorialFromStudent,
} from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const {
      params: { course, startDatetimeIdentifier },
      body: { studentId },
    } = req;

    if (!isStudent(req)) return res.status(401).json({ message: 'Only students may unbook tutorials' });
    if (req.context.userId !== studentId) return res.status(401).json({ message: 'Unauthorised action' });

    if (course && startDatetimeIdentifier && studentId) {
      const student = await getStudent(studentId);
      const tutorial = await getTutorial(course, startDatetimeIdentifier);

      if (!student) return res.status(400).json({ message: 'Student not found' });
      if (!tutorial) return res.status(400).json({ message: 'Tutorial not found' });

      // Checks that student is currently booked
      if (tutorial?.attendees?.filter((attendee: any) =>
        attendee.studentId === studentId).length <= 0) {
        return res.status(400).json({ message: 'Not currently booked by student' });
      }

      // Get the index of the tutorial in the student's tutorials list
      const tutorialIndex = student?.tutorials?.map((x: any) => `${x.course}#${x.startDatetimeIdentifier}`)
        .indexOf(`${course}#${startDatetimeIdentifier}`);

      // Get the index of the student in the tutorial's attendees list
      const attendeeIndex = tutorial?.attendees?.map((x: any) => x.studentId).indexOf(studentId);

      // This database operation should be atomic, but DynamoDB does not provide an atomic
      // 'update' operation currently. Should update this if that feature is ever released.
      const updateOutput =
      await Promise.all([
        removeAttendeeFromTutorial(course, startDatetimeIdentifier, attendeeIndex),
        removeTutorialFromStudent(studentId, tutorialIndex),
      ]);

      if (updateOutput) return res.status(200).json({ message: 'Booking cancelled' });

      return res.status(400).json({ message: 'Booking could not be cancelled' });
    }
    return res.status(400).json({ message: 'Insufficient information provided' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Booking could not be cancelled' });
  }
};
