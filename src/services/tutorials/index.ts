import axios, { AxiosError } from 'axios';

import { CalendarEntry } from '../../components/WeekCalendar/types';

import { Tutorial } from './types';

const getSubject = (courseCode: string) => {
  switch (courseCode) {
    case 'chem11':
      return 'Chemistry';
    case 'chem12':
      return 'Chemistry';
    case 'phys11':
      return 'Physics';
    case 'phys12':
      return 'Physics';
    default:
      return '';
  }
};

/**
 * Checks if the user is whitelisted
 * @param startDatetime
 * @param endDatetime
 * @param course
 * @param onError Callback which is executed when the API call encounters an error
 * @returns List of tutorials between the two datetimes supplied
 */
export const getTutorialsInRange = async (startDatetime: number, endDatetime: number,
  course: string, onError?: (err: AxiosError) => void) => {
  try {
    if (startDatetime && endDatetime && course) {
      const data: any = await axios(`${process.env.REACT_APP_BACKEND_URI}tutorials/`, {
        params: {
          startDatetime, endDatetime, course,
        },
      });
      const tutorials: CalendarEntry[] = data.map((tutorial: Tutorial) => ({
        startDatetime: tutorial.startDatetimeIdentifier.split('#')[0],
        duration: tutorial.duration,
        title: `${getSubject(tutorial.course)} Tutorial`,
        color: getSubject(tutorial.course),
        action: 'JOIN',
      }));
      return tutorials;
    }
    console.log('Parameters not provided');
  } catch (err) {
    if (axios.isAxiosError(err) && onError) onError(err);
  }
  return null;
};
