import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert, Collapse, IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { signIn } from '../../auth';

import {
  StyledButton, StyledSignIn, StyledTextField,
} from './index.styles';

interface Data {
  email:string;
  password:string;
}

const SignIn = (/* { mobile = false }: SignInProps */) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSuccess = () => {
    setLoading(false);
    setErrorMessage('Success!');
    setErrorOpen(true);
  };

  const onFailure = (err: any) => {
    setLoading(false);
    setErrorMessage(err.message || 'An error has occurred');
    setErrorOpen(true);
  };

  const onSubmit = async (data: Data) => {
    setLoading(true);
    await signIn(data.email, data.password, onSuccess, onFailure);
  };

  const getErrorMessage = (type: string, field: string): string => {
    switch (type) {
      case 'pattern':
        return `Please enter a valid ${field}`;
      case 'required':
        return `Please enter your ${field}`;
      default:
        return `Error: ${type}`;
    }
  };

  return (
    <StyledSignIn onSubmit={handleSubmit(onSubmit)}>
      <Collapse in={errorOpen}>
        <Alert
          severity="error"
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setErrorOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        >
          {errorMessage}
        </Alert>
      </Collapse>
      <StyledTextField
        placeholder="Email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        error={!!errors.email}
        errorMessage={errors.email ? getErrorMessage(errors.email.type, 'email') : ''}
      />
      <StyledTextField
        placeholder="Password"
        type="password"
        {...register('password', { required: true })}
        error={!!errors.password}
        errorMessage={errors.password ? getErrorMessage(errors.password.type, 'password') : ''}
      />
      <StyledButton type="submit" loading={loading}>
        Sign In
      </StyledButton>
    </StyledSignIn>
  );
};

export default SignIn;
