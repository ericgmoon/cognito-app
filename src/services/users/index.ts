import axios, { AxiosError } from 'axios';

/**
 * Checks if the user is whitelisted
 * @param phoneNumber
 * @param onError Callback which is executed when the API call encounters an error
 * @returns User record on the whitelist, or `null` if it is not whitelisted
 */
export const validateNewUser = async (phoneNumber: string | undefined,
  onError?: (err: AxiosError) => void) => {
  if (phoneNumber) {
    return axios(`${process.env.REACT_APP_BACKEND_URI}users/validate`, { params: { phoneNumber } })
      .catch((err) => {
        if (axios.isAxiosError(err) && onError) onError(err);
      });
  }
  return null;
};
