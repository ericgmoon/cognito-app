import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken } from './auth';

// An empty api service where we inject endpoints into
export const cognitoApi = createApi({
  reducerPath: 'cognitoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URI,
    prepareHeaders: (headers) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
      getAccessToken()
        .then((res) => {
          headers.set('Authorization', String(res));
        });
      return headers;
    },
  }),
  tagTypes: ['Users', 'Tutorials', 'Students'],
  endpoints: () => ({}),
});
