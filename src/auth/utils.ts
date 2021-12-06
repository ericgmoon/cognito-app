import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

export const getCognitoUserPool = () =>
  new CognitoUserPool({
    UserPoolId: 'ap-southeast-2_gEVRCqM0c',
    ClientId: '2rg3ks65nt10j65ir7q6u9r2r7',
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
