import {
  AuthenticationDetails, CognitoUserAttribute, NodeCallback,
} from 'amazon-cognito-identity-js';

import { validateNewUser } from '../services/users';

import {
  getCognitoUser, getCognitoUserPool, getErrorMessage,
} from './utils';

type AttributeCallbackFn = NodeCallback<Error, CognitoUserAttribute[]>;

/**
 * @returns Currently authenticated user object
 */
export const getCurrentUser = () => getCognitoUserPool().getCurrentUser();

/**
 * @returns Username of `getCurrentUser()`
 */
export const getCurrentUsername = () => getCognitoUserPool().getCurrentUser()?.getUsername();

/**
 * Creates an unverified AWS Cognito account
 * @param username
 * @param password
 * @param email
 * @param phoneNumber
 */
const signUp = async (
  username: string | undefined,
  password: string | undefined,
  email: string | undefined,
  phoneNumber: string | undefined) => {
  // TODO: Throw error in these cases once error handling is implemented
  if (!username || !password || !email || !phoneNumber) return null;

  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  });

  const phoneNumberAttribute = new CognitoUserAttribute({
    Name: 'phone_number',
    Value: phoneNumber,
  });

  const userAttributes = [emailAttribute, phoneNumberAttribute];

  return getCognitoUserPool().signUp(username, password, userAttributes, [], (err) => {
    // TODO: Throw error in these cases once error handling is implemented
    if (err) console.log(getErrorMessage(err));
  });
};

export const signUpWithValidation = async (
  username: string | undefined,
  password: string | undefined,
  email: string | undefined,
  phoneNumber: string | undefined) => {
  // Check if the user is validated / whitelisted
  const response = await validateNewUser(phoneNumber, (err) =>
    console.log(err?.response?.data?.message));

  if (response) return signUp(username, password, email, phoneNumber);
  return null;
};

/**
 * Verifies an existing AWS Cognito account based on the SMS code delivered to user
 * @param username
 * @param verificationCode
 */
export const confirmSignUp = async (username: string | undefined, verificationCode: string) =>
  getCognitoUser(username)?.confirmRegistration(verificationCode, true, (err) => {
    if (err) console.log(getErrorMessage(err));
  });

/**
 * Re-sends the verificaiton code to the user's mobile device
 * @param username
 * @returns
 */
export const resendConfirmationCode = async (username: string | undefined) =>
  getCognitoUser(username)?.resendConfirmationCode((err) => {
    if (err) console.log(getErrorMessage(err));
  });

/**
 * Authenticates an AWS Cognito account, then stores it in local storage
 * @param username
 * @param password
 * @param onSuccess
 * @param onFailure
 */
export const signIn = async (
  username: string | undefined,
  password: string,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) => {
  // TODO: Throw error in these cases once error handling is implemented
  if (!username || !password) return null;

  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  return getCognitoUser(username)?.authenticateUser(authenticationDetails, {
    onSuccess: () => onSuccess && onSuccess(),
    onFailure: (err) => {
      // TODO: Throw error in these cases once error handling is implemented
      console.log(getErrorMessage(err));
      return onFailure && onFailure(err);
    },
  });
};

/**
 * Removes the AWS Cognito account from the local storage
 */
export const signOut = async () => {
  const username = await getCurrentUsername();

  if (username) {
    await getCognitoUser(username)?.signOut();
  } else {
    // TODO: Throw error in these cases once error handling is implemented
    console.log('No user is currently authenticated');
  }
};

/**
 * Invalidates all session tokens associated with an AWS Cognito account
 */
export const globalSignOut = async (
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) => {
  const username = await getCurrentUsername();

  if (username) {
    await getCognitoUser(username)?.globalSignOut({
      onSuccess: () => onSuccess && onSuccess(),
      onFailure: (err) => {
        // TODO: Throw error in these cases once error handling is implemented
        console.log(getErrorMessage(err));
        return onFailure && onFailure(err);
      },
    });
  } else {
    // TODO: Throw error in these cases once error handling is implemented
    console.log('No user is currently authenticated');
  }
};

/**
 * Updates the password of the currently authenticated user
 * @param oldPassword
 * @param newPassword
 */
export const changePassword = async (oldPassword: string, newPassword: string) => {
  const username = await getCurrentUsername();

  if (username) {
    await getCognitoUser(username)?.changePassword(oldPassword, newPassword, (err) => {
      // TODO: Throw error in these cases once error handling is implemented
      if (err) console.log(getErrorMessage(err));
    });
  } else {
    // TODO: Throw error in these cases once error handling is implemented
    console.log('No user is currently authenticated');
  }
};

/**
 * Sends a password reset code to the user's mobile
 * @param username
 * @param onSuccess
 * @param onFailure
 */
export const sendPasswordResetCode = (
  username: string | undefined,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) =>
  getCognitoUser(username)?.forgotPassword({
    onSuccess: () => onSuccess && onSuccess(),
    onFailure: (err) => {
      // TODO: Throw error in these cases once error handling is implemented
      console.log(getErrorMessage(err));
      return onFailure && onFailure(err);
    },
  });

/**
 * Verifies the password reset code to update the user's password
 * This function should only be called after `sendPasswordResetCode()`
 * @param username
 * @param verificationCode
 * @param newPassword
 * @param onSuccess
 * @param onFailure
 */
export const confirmPasswordResetCode = (
  username: string | undefined,
  verificationCode: string,
  newPassword: string,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) =>
  getCognitoUser(username)?.confirmPassword(verificationCode, newPassword, {
    onSuccess: () => onSuccess && onSuccess(),
    onFailure: (err) => {
      // TODO: Throw error in these cases once error handling is implemented
      console.log(getErrorMessage(err));
      return onFailure && onFailure(err);
    },
  });

/**
 * Provides the specified user's AWS Cognito attributes through a callback
 * @param callback
 * @returns `null`
 */
export const getUserAttributes = async (
  username: string | undefined,
  callback?: AttributeCallbackFn) => {
  const user = getCognitoUser(username);
  // `getSession` must be called on the same instance of user for this function to work
  await user?.getSession(() =>
    user.getUserAttributes((err, attributes) => (
      callback && callback(err, attributes)
    )),
  );
};

/**
 * Sends an email to the user containing the verification code
 * @param username
 * @param onSuccess
 * @param onFailure
 */
export const sendEmailConfirmationCode = async (
  username: string | undefined,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) => {
  const user = getCognitoUser(username);
  // `getSession` must be called on the same instance of user for this function to work
  await user?.getSession(() =>
    user.getAttributeVerificationCode('email', {
      onSuccess: () => onSuccess && onSuccess(),
      onFailure: (err) => {
        // TODO: Throw error in these cases once error handling is implemented
        console.log(getErrorMessage(err));
        return onFailure && onFailure(err);
      },
    }),
  );
};

/**
 * Verifies an email for a specified user via the emailed verification code
 * @param username
 * @param verificationCode
 * @param onSuccess
 * @param onFailure
 */
export const confirmEmailConfirmationCode = async (
  username: string | undefined,
  verificationCode: string,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) => {
  const user = getCognitoUser(username);
  // `getSession` must be called on the same instance of user for this function to work
  await user?.getSession(() =>
    user.verifyAttribute('email', verificationCode, {
      onSuccess: () => onSuccess && onSuccess(),
      onFailure: (err) => {
        // TODO: Throw error in these cases once error handling is implemented
        console.log(getErrorMessage(err));
        return onFailure && onFailure(err);
      },
    }),
  );
};
