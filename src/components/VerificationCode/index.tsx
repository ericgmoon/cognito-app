/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert, Collapse, IconButton, Link,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { confirmSignUp, resendConfirmationCode } from '../../auth';

import {
  FooterText, StyledButton, StyledField, StyledVerification,
} from './index.styles';

interface Data {
  verification:string;
}

interface VerificationCodeProps {
  email: string;
  finishSignUp: () => void;
}

const VerificationCode = ({ email, finishSignUp } : VerificationCodeProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSuccess = () => {
    setLoading(false);
    finishSignUp();
  };

  const onFailure = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message || 'An error has occurred');
    setErrorOpen(true);
  };

  const onSubmit = async (data: Data) => {
    setLoading(true);
    try {
      await confirmSignUp(email, data.verification);
      onSuccess();
    } catch (error: any) {
      onFailure(error);
    }
  };

  const onResendCode = async () => {
    setLoading(true);
    try {
      await resendConfirmationCode(email);
      setLoading(false);
    } catch (error: any) {
      onFailure(error);
    }
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
          {errorMessage}
        </Alert>
      </Collapse>
      <StyledField
        error={!!errors.verification}
        errorMessage={errors.verification ? getErrorMessage(errors.verification.type, 'verification') : ''}
        maxLength={6}
        numbersOnly
        {...register('verification', { required: true, pattern: /\d{6}/ })}
      />
      <FooterText>Can't find the code?&nbsp;
        <Link
          component="button"
          variant="body1"
          onClick={onResendCode}
          underline="always"
          type="button"
        >
          Resend Code
        </Link>
      </FooterText>
      <StyledButton type="submit" loading={loading}>
        Verify
      </StyledButton>
    </StyledVerification>
  );
};

export default VerificationCode;
