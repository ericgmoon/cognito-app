import {
  AuthenticationDetails, CognitoUserAttribute, NodeCallback,
} from 'amazon-cognito-identity-js';

import {
  getCognitoUser, getCognitoUserPool,
} from './utils';

type AttributeCallbackFn = NodeCallback<Error, CognitoUserAttribute[]>;

/**
 * @returns Currently authenticated user object
 */
const getCurrentUser = () => getCognitoUserPool().getCurrentUser();

/**
 * @returns ID/Username of `getCurrentUser()`
 */
export const getCurrentUserId = () => getCognitoUserPool().getCurrentUser()?.getUsername();

/**
 * @returns Currently authenticated user's Cognito groups
 */
export const getCurrentUserGroups = () => new Promise((resolve, reject) => {
  getCurrentUser()?.getSession((err: Error, session: any) => {
    if (err) reject(err);
    else resolve(session?.idToken?.payload['cognito:groups']);
  });
});

/**
 * @returns Currently authenticated user's access token
 */
export const getAccessToken = () => new Promise((resolve, reject) => {
  getCurrentUser()?.getSession((err: Error, session: any) => {
    if (err) reject(err);
    else resolve(session?.accessToken?.jwtToken);
  });
});

/**
 * Creates an unverified AWS Cognito account
 * @param email
 * @param password
 * @param phoneNumber
 */
export const signUp = async (
  email: string | undefined,
  password: string | undefined,
  phoneNumber: string | undefined) => new Promise<void>((resolve, reject) => {
  if (!email || !password || !phoneNumber) {
    reject(Error('Missing required details.'));
    return;
  }

  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  });

  const phoneNumberAttribute = new CognitoUserAttribute({
    Name: 'phone_number',
    Value: phoneNumber,
  });

  const userAttributes = [emailAttribute, phoneNumberAttribute];

  getCognitoUserPool().signUp(email, password, userAttributes, [], (err) => {
    if (err) reject(err);
    else resolve();
  });
});

/**
 * Verifies an existing AWS Cognito account based on the SMS code delivered to user
 * @param email
 * @param verificationCode
 */
export const confirmSignUp = async (email: string | undefined, verificationCode: string) =>
  new Promise<void>((resolve, reject) => {
    getCognitoUser(email)?.confirmRegistration(verificationCode, true, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

/**
 * Re-sends the verificaiton code to the user's mobile device
 * @param email
 * @returns
 */
export const resendConfirmationCode = async (email: string | undefined) =>
  new Promise<void>((resolve, reject) => {
    getCognitoUser(email)?.resendConfirmationCode((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

/**
 * Authenticates an AWS Cognito account, then stores it in local storage
 * @param email
 * @param password
 */
export const signIn = async (
  email: string,
  password: string) => new Promise((resolve, reject) => {
  if (!email || !password) reject(Error('Missing email or password.'));

  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  getCognitoUser(email)?.authenticateUser(authenticationDetails, {
    onSuccess: resolve,
    onFailure: reject,
  });
});

/**
 * Removes the AWS Cognito account from the local storage
 */
export const signOut = async () => {
  const username = await getCurrentUserId();

  if (username) {
    return getCognitoUser(username)?.signOut();
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Invalidates all session tokens associated with an AWS Cognito account
 */
export const globalSignOut = async () => {
  const username = await getCurrentUserId();

  if (username) {
    return new Promise((resolve, reject) => {
      getCognitoUser(username)?.globalSignOut({
        onSuccess: resolve,
        onFailure: reject,
      });
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
  const username = await getCurrentUserId();

  if (username) {
    return new Promise<void>((resolve, reject) => {
      getCognitoUser(username)?.changePassword(oldPassword, newPassword, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Sends a password reset code to the user's mobile
 * @param email
 */
export const sendPasswordResetCode = (
  email: string | undefined) => new Promise((resolve, reject) => {
  getCognitoUser(email)?.forgotPassword({
    onSuccess: resolve,
    onFailure: reject,
  });
});

/**
 * Verifies the password reset code to update the user's password
 * This function should only be called after `sendPasswordResetCode()`
 * @param email
 * @param verificationCode
 * @param newPassword
 */
export const confirmPasswordResetCode = (
  email: string | undefined,
  verificationCode: string,
  newPassword: string) => new Promise((resolve, reject) => {
  getCognitoUser(email)?.confirmPassword(verificationCode, newPassword, {
    onSuccess: resolve,
    onFailure: reject,
  });
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
    return user?.getSession(() =>
      user.getUserAttributes((err, attributes) => (
        callback && callback(err, attributes)
      )),
    );
  }
  throw Error('No user is currently authenticated.');
};

/**
 * Sends an email to the current user containing the verification code
 */
export const sendEmailConfirmationCode = async () => new Promise((resolve, reject) => {
  const user = getCurrentUser();
  // `getSession` must be called on the same instance of user for this function to work
  if (user) {
    user?.getSession(() =>
      user.getAttributeVerificationCode('email', {
        onSuccess: resolve,
        onFailure: reject,
      }),
    );
  }
  reject(Error('No user is currently authenticated.'));
});

/**
 * Verifies an email for the current user via the emailed verification code
 * @param verificationCode
 */
export const confirmEmailConfirmationCode = async (
  verificationCode: string) => new Promise((resolve, reject) => {
  const user = getCurrentUser();
  if (user) {
    // `getSession` must be called on the same instance of user for this function to work
    user?.getSession(() =>
      user.verifyAttribute('email', verificationCode, {
        onSuccess: resolve,
        onFailure: reject,
      }),
    );
  }
  reject(Error('No user is currently authenticated.'));
});

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
