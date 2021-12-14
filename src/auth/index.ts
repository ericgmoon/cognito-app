import {
  AuthenticationDetails, CognitoUserAttribute, NodeCallback,
} from 'amazon-cognito-identity-js';

import { validateNewUser } from '../services/users';

import {
  getCognitoUser, getCognitoUserPool,
} from './utils';

type AttributeCallbackFn = NodeCallback<Error, CognitoUserAttribute[]>;

/**
 * @returns Currently authenticated user object
 */
const getCurrentUser = () => getCognitoUserPool().getCurrentUser();

/**
 * @returns Email (unique username) of `getCurrentUser()`
 */
const getCurrentUserEmail = () => getCognitoUserPool().getCurrentUser()?.getUsername();

/**
 * Creates an unverified AWS Cognito account
 * @param email
 * @param password
 * @param phoneNumber
 */
const signUp = async (
  email: string | undefined,
  password: string | undefined,
  phoneNumber: string | undefined) => {
  if (!email || !password || !phoneNumber) throw Error('Missing required details.');

  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  });

  const phoneNumberAttribute = new CognitoUserAttribute({
    Name: 'phone_number',
    Value: phoneNumber,
  });

  const userAttributes = [emailAttribute, phoneNumberAttribute];

  return getCognitoUserPool().signUp(email, password, userAttributes, [], (err) => {
    if (err) throw err;
  });
};

export const signUpWithValidation = async (
  email: string | undefined,
  password: string | undefined,
  phoneNumber: string | undefined) => {
  // Check if the user is validated / whitelisted
  const response = await validateNewUser(phoneNumber, (err) => {
    if (err?.response?.data?.message) throw Error(err?.response?.data?.message);
  });

  if (response) return signUp(email, password, phoneNumber);
  throw Error('Unable to verify user.');
};

/**
 * Verifies an existing AWS Cognito account based on the SMS code delivered to user
 * @param email
 * @param verificationCode
 */
export const confirmSignUp = async (email: string | undefined, verificationCode: string) =>
  getCognitoUser(email)?.confirmRegistration(verificationCode, true, (err) => {
    if (err) throw err;
  });

/**
 * Re-sends the verificaiton code to the user's mobile device
 * @param email
 * @returns
 */
export const resendConfirmationCode = async (email: string | undefined) =>
  getCognitoUser(email)?.resendConfirmationCode((err) => {
    if (err) throw err;
  });

/**
 * Authenticates an AWS Cognito account, then stores it in local storage
 * @param email
 * @param password
 * @param onSuccess
 * @param onFailure
 */
export const signIn = async (
  email: string | undefined,
  password: string,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) => {
  if (!email || !password) throw Error('Missing email or password.');

  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return getCognitoUser(email)?.authenticateUser(authenticationDetails, {
    onSuccess: () => onSuccess && onSuccess(),
    onFailure: (err) => onFailure && onFailure(err),
  });
};

/**
 * Removes the AWS Cognito account from the local storage
 */
export const signOut = async () => {
  const email = await getCurrentUserEmail();

  if (email) {
    await getCognitoUser(email)?.signOut();
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Invalidates all session tokens associated with an AWS Cognito account
 */
export const globalSignOut = async (
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) => {
  const email = await getCurrentUserEmail();

  if (email) {
    await getCognitoUser(email)?.globalSignOut({
      onSuccess: () => onSuccess && onSuccess(),
      onFailure: (err) => onFailure && onFailure(err),
    });
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Updates the password of the currently authenticated user
 * @param oldPassword
 * @param newPassword
 */
export const changePassword = async (oldPassword: string, newPassword: string) => {
  const email = await getCurrentUserEmail();

  if (email) {
    await getCognitoUser(email)?.changePassword(oldPassword, newPassword, (err) => {
      if (err) throw err;
    });
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Sends a password reset code to the user's mobile
 * @param email
 * @param onSuccess
 * @param onFailure
 */
export const sendPasswordResetCode = (
  email: string | undefined,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) =>
  getCognitoUser(email)?.forgotPassword({
    onSuccess: () => onSuccess && onSuccess(),
    onFailure: (err) => onFailure && onFailure(err),
  });

/**
 * Verifies the password reset code to update the user's password
 * This function should only be called after `sendPasswordResetCode()`
 * @param email
 * @param verificationCode
 * @param newPassword
 * @param onSuccess
 * @param onFailure
 */
export const confirmPasswordResetCode = (
  email: string | undefined,
  verificationCode: string,
  newPassword: string,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) =>
  getCognitoUser(email)?.confirmPassword(verificationCode, newPassword, {
    onSuccess: () => onSuccess && onSuccess(),
    onFailure: (err) => onFailure && onFailure(err),
  });

/**
 * Provides the current user's AWS Cognito attributes through a callback
 * @param callback
 * @returns `null`
 */
export const getCurrentUserAttributes = async (
  callback?: AttributeCallbackFn) => {
  const user = getCurrentUser();
  if (user) {
    // `getSession` must be called on the same instance of user for this function to work
    await user?.getSession(() =>
      user.getUserAttributes((err, attributes) => (
        callback && callback(err, attributes)
      )),
    );
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Sends an email to the current user containing the verification code
 * @param onSuccess
 * @param onFailure
 */
export const sendEmailConfirmationCode = async (
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) => {
  const user = getCurrentUser();
  // `getSession` must be called on the same instance of user for this function to work
  if (user) {
    await user?.getSession(() =>
      user.getAttributeVerificationCode('email', {
        onSuccess: () => onSuccess && onSuccess(),
        onFailure: (err) => onFailure && onFailure(err),
      }),
    );
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Verifies an email for the current user via the emailed verification code
 * @param verificationCode
 * @param onSuccess
 * @param onFailure
 */
export const confirmEmailConfirmationCode = async (
  verificationCode: string,
  onSuccess?: () => any,
  onFailure?: (err? : any) => any) => {
  const user = getCurrentUser();
  if (user) {
    // `getSession` must be called on the same instance of user for this function to work
    await user?.getSession(() =>
      user.verifyAttribute('email', verificationCode, {
        onSuccess: () => onSuccess && onSuccess(),
        onFailure: (err) => onFailure && onFailure(err),
      }),
    );
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Async function returning whether or not a user is currently authenticated
 * @returns Authentication state
 */
export const getIsUserAuthenticated = async () => {
  const user = getCurrentUser();
  if (!user) return false;

  const getCurrentSession = () => new Promise((resolve) => {
    user.getSession((err: any, session: any) => {
      if (err || !session) resolve(false);
      if (session) resolve(true);
    });
  });

  const isSessionValid = await getCurrentSession();
  if (isSessionValid) return true;
  return false;
};
