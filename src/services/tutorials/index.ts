import axios, { AxiosError } from 'axios';

/**
 * Checks if the user is whitelisted
 * @param startDatetime
 * @param endDatetime
 * @param course
 * @param onError Callback which is executed when the API call encounters an error
 * @returns List of tutorials between the two datetimes supplied
 */
export const getTutorialsInRange = async (startDatetime: string, endDatetime: string,
  course: string, onError?: (err: AxiosError) => void) => {
  if (startDatetime && endDatetime && course) {
    return axios(`${process.env.REACT_APP_BACKEND_URI}}tutorials`, {
      params: {
        startDatetime, endDatetime, course,
      },
    })
      .catch((err) => {
        if (axios.isAxiosError(err) && onError) onError(err);
      });
  }
  return null;
};
