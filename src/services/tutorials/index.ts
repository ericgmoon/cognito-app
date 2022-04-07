import { CalendarEntry } from '../../components/WeekCalendar/types';
import { cognitoApi } from '../cognitoApi';
import { QueryData } from '../types';

import { Tutorial } from './types';
import { toCalendarEntry } from './utils';

export const tutorialsApi = cognitoApi.injectEndpoints({
  endpoints: (build) => ({
    getTutorialsInRange: build.query<CalendarEntry[],
    {startDatetime: number, endDatetime: number, courses: string}>({
      query(arg) {
        const { startDatetime, endDatetime, courses } = arg;
        return {
          url: 'tutorials/query',
          params: {
            startDatetime, endDatetime, courses,
          },
          method: 'GET',
        };
      },
      transformResponse(response: any) {
        return [].concat(...response.data.map((courseTutorials: QueryData) =>
          courseTutorials.Items)).map((tutorial: Tutorial) => toCalendarEntry(tutorial));
      },
    }),
  }),
});

export const { useGetTutorialsInRangeQuery } = tutorialsApi;
