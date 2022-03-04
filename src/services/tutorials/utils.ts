import { CalendarEntry } from '../../components/WeekCalendar/types';

import { Tutorial } from './types';

const MSINMIN = 60000;

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

const toSentenceCase = (sentence: string) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);

const getStartDatetime = (startDatetimeIdentifier: string) =>
  parseInt(startDatetimeIdentifier.split('#')[0], 10);

const getState = (tutorial: Tutorial) => {
  if (Date.now() > getStartDatetime(tutorial.startDatetimeIdentifier)
    + tutorial.duration * MSINMIN) {
    return 'readOnly';
  }
  if (getStartDatetime(tutorial.startDatetimeIdentifier) - Date.now() < 5 * MSINMIN) {
    return 'imminent';
  }
  if (tutorial.attendees.length >= tutorial.capacity) {
    return 'full';
  }
  return 'open';
};

export const toCalendarEntry = (tutorial: Tutorial): CalendarEntry => ({
  startDatetime: getStartDatetime(tutorial.startDatetimeIdentifier),
  duration: tutorial.duration,
  title: `${toSentenceCase(getSubject(tutorial.course) ?? 'unknown')} Tutorial`,
  color: getSubject(tutorial.course),
  properties: { Tutor: tutorial.host },
  state: getState(tutorial),
});
