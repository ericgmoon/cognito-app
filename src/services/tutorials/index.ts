import { CalendarEntry } from '../../components/WeekCalendar/types';
import { cognitoApi } from '../cognitoApi';

import { Tutorial } from './types';
import { toCalendarEntry } from './utils';

export const tutorialsApi = cognitoApi.injectEndpoints({
  endpoints: (build) => ({
    getTutorialsInRange: build.query<CalendarEntry[],
    {startDatetime: number, endDatetime: number, course: string}>({
      query(arg) {
        const { startDatetime, endDatetime, course } = arg;
        return {
          url: 'tutorials/query',
          params: {
            startDatetime, endDatetime, course,
          },
          method: 'GET',
        };
      },
      transformResponse(response: any) {
        return response.data.Items.map((tutorial: Tutorial) => toCalendarEntry(tutorial));
      },
    }),
  }),
});

export const { useGetTutorialsInRangeQuery } = tutorialsApi;
