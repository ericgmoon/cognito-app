import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

export const getCognitoUserPool = () =>
  new CognitoUserPool({
    UserPoolId: 'ap-southeast-2_UZHhn9SC9',
    ClientId: '4qn2pq6h5t9eom0fb1p4gnuqti',
  });

export const getCognitoUser = (username: string | undefined) => {
  if (username) {
    return new CognitoUser({
      Username: username,
      Pool: getCognitoUserPool(),
    });
  } return null;
};

export const getErrorMessage = (err: any) => err.message || JSON.stringify(err);
