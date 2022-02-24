import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CalendarEntry } from '../../components/WeekCalendar/types';

import { Tutorial } from './types';
import { tutorialToCalendarEntry } from './utils';

export const tutorialsApi = createApi({
  reducerPath: 'tutorialsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URI}tutorials/` }),
  tagTypes: ['Tutorials'],
  endpoints: (build) => ({
    getTutorialsInRange: build.query<CalendarEntry[],
    {startDatetime: number, endDatetime: number, course: string}>({
      query(arg) {
        const { startDatetime, endDatetime, course } = arg;
        return {
          url: 'query',
          params: {
            startDatetime, endDatetime, course,
          },
          method: 'GET',
        };
      },
      transformResponse(response: any) {
        return response.data.Items.map((tutorial: Tutorial) => tutorialToCalendarEntry(tutorial));
      },
    }),
  }),
});

export const { useGetTutorialsInRangeQuery } = tutorialsApi;
