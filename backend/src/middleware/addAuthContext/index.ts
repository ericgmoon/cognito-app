// Written based on https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html

import dotenv from 'dotenv';
import {
  NextFunction, Request, Response,
} from 'express';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

dotenv.config();

const pem = jwkToPem(
  {
    // alg: 'RS256',
    e: 'AQAB',
    // kid: 'Q7MAKHQfycjn9jCeBWo2abN3NRonGw+MlYHskNmZtX0=',
    kty: 'RSA',
    n: 'oylodAN74GKpkfFKQ_2pqfApLABXB5q576VY16_CMJH2a_Hr4L8WB0bQ5uL74HQKNRNIaFI5WqU32bn20URBxwHnbUQIRIr-9D2Hs_6q7lIocTGYDCkv-BnII3AO58kEEkbVD7IHZ_trHrAzQiY_X9F2_m0jg4KwfEmNcEsIyACvQ2LqWvD1jFDgEbVWeaKA5cWgNDRl59bZtUDyQkU8X1eakCZ7QqXGvpKa0s0PbWGcvKJldaYjpXaHbrbJa9d-5b8f2NNGllbjCs6rx1uGpVN7yVEFjP63dm0rqxIFhUUIvYW7R11ATX29XIxCPSMDZaYORBNbcGMH7tGyJ5j1bw',
    // use: 'sig',
  });

const APP_CLIENT_ID = process.env.AWS_COGNITO_APP_CLIENT_ID;
const BASE_URI = process.env.AWS_COGNITO_BASE_URI;
const USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID;

const addAuthContext = (req: Request, res: Response, next: NextFunction) => {
  const accessToken: string = req.get('Authorization') || '';

  // Set default contexts
  req.context = {
    userId: undefined,
    userGroups: [],
  };

  try {
    const payload: any = jwt.verify(accessToken, pem, { algorithms: ['RS256'] });

    if (payload?.client_id === APP_CLIENT_ID
      && payload?.iss === `${BASE_URI}${USER_POOL_ID}`
      && payload?.token_use === 'access') {
      req.context = {
        userId: payload.sub,
        userGroups: payload['cognito:groups'],
      };
    }
    next();
  } catch (err) {
    next();
  }
};

export default addAuthContext;
