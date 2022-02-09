import axios from 'axios';

/**
 * Checks if the user is whitelisted
 * @param phoneNumber
 * @returns User record on the whitelist, or `null` if it is not whitelisted
 */
export const validateNewUser = async (phoneNumber: string | undefined) => {
  if (phoneNumber) {
    try {
      const response = await axios(`${process.env.REACT_APP_BACKEND_URI}users/validate`, { params: { phoneNumber } });
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) throw Error(err?.response?.data?.message);
      else throw err;
    }
  }
  return null;
};
