import React, { Fragment } from 'react';

import Button from '../Button';
import TextField from '../TextField';

// interface LoginProps {
//     label: string;
//     disabled?: boolean;
// }

const Login = (/* { disabled = false, label }: LoginProps */) => (
  <>
    <TextField label="First Name" />
    <Button text="submit" />
  </>
);

export default Login;
