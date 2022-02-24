import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// An empty api service where we inject endpoints into
export const cognitoApi = createApi({
  reducerPath: 'cognitoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URI }),
  tagTypes: ['Users', 'Tutorials'],
  endpoints: () => ({}),
});
