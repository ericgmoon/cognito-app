import { cognitoApi } from '../cognitoApi';

// Define a service using a base URL and expected endpoints
export const studentsApi = cognitoApi.injectEndpoints({
  endpoints: (build) => ({
    getStudent: build.query<any, string>({
      query: (studentId) => `students/${studentId}`,
      providesTags: (studentId) => [{ type: 'Students', id: studentId }],
    }),
  }),
});

export const { useGetStudentQuery } = studentsApi;
