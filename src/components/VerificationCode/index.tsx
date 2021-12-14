import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert, Collapse, IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { confirmSignUp } from '../../auth';

import {
  StyledButton, StyledField, StyledVerification,
} from './index.styles';

interface Data {
  verification:string;
}

const SignIn = (email: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  // const onSuccess = () => {
  //   setLoading(false);
  //   setErrorMessage('Success!');
  //   setErrorOpen(true);
  // };

  // const onFailure = (err: any) => {
  //   setLoading(false);
  //   setErrorMessage(err.message || 'An error has occurred');
  //   setErrorOpen(true);
  // };

  const onSubmit = async (data: Data) => {
    setLoading(true);
    await confirmSignUp(email, data.verification);
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
    <StyledVerification onSubmit={handleSubmit(onSubmit)}>
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
          {/* {errorMessage} */} Error!
        </Alert>
      </Collapse>
      <StyledField
        error={!!errors.verification}
        errorMessage={errors.verification ? getErrorMessage(errors.verification.type, 'verification') : ''}
        maxLength={6}
        numbersOnly
        {...register('verification', { required: true, pattern: /\d{6}/ })}
      />
      <StyledButton type="submit" loading={loading}>
        Verify
      </StyledButton>
    </StyledVerification>
  );
};

export default SignIn;
