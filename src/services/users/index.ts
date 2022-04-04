import { cognitoApi } from '../cognitoApi';

// Define a service using a base URL and expected endpoints
export const usersApi = cognitoApi.injectEndpoints({
  endpoints: (build) => ({
    validateNewUser: build.mutation<any, string | undefined>({
      query(phoneNumber) {
        return {
          url: 'users/validate',
          params: { phoneNumber },
          method: 'GET',
        };
      },
      // Invalidates all queries that subscribe to this User `phoneNumber` only.
      invalidatesTags: (phoneNumber) => [{ type: 'Users', phoneNumber }],
    }),
  }),
});

export const { useValidateNewUserMutation } = usersApi;
