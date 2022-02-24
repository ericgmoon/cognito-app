import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URI}users` }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    validateNewUser: build.mutation<any, string | undefined>({
      query(phoneNumber) {
        return {
          url: 'validate',
          params: { phoneNumber },
          method: 'GET',
        };
      },
      // Invalidates all queries that subscribe to this User `phoneNumber` only.
      invalidatesTags: (phoneNumber) => [{ type: 'Users', phoneNumber }],
    }),
  }),
});

export const { useValidateNewUserMutation } = userApi;
