import { CalendarEntry } from '../../components/WeekCalendar/types';

import { Tutorial } from './types';

const getSubject = (courseCode: string) => {
  switch (courseCode) {
    case 'chem11':
      return 'chemistry';
    case 'chem12':
      return 'chemistry';
    case 'phys11':
      return 'physics';
    case 'phys12':
      return 'physics';
    default:
      return undefined;
  }
};

const sentenceCase = (sentence: string) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);

export const tutorialToCalendarEntry = (tutorial: Tutorial): CalendarEntry => ({
  startDatetime: parseInt(tutorial.startDatetimeIdentifier.split('#')[0], 10),
  duration: tutorial.duration,
  title: `${sentenceCase(getSubject(tutorial.course) ?? 'unknown')} Tutorial`,
  color: getSubject(tutorial.course),
  action: 'JOIN',
});
