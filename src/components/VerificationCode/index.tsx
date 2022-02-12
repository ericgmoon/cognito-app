/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert, Collapse, IconButton, Link,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import FixedLengthField from '../FixedLengthField';

import {
  FixedLengthFieldContainer, FooterText, StyledButton, StyledVerification,
} from './index.styles';

interface Data {
  verification: string;
}

interface VerificationCodeProps {
  confirm: (data: Data) => void;
  resend: () => void;
  onConfirm: () => void;
}

const VerificationCode = ({ confirm, resend, onConfirm } : VerificationCodeProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSuccess = () => {
    setLoading(false);
    onConfirm();
  };

  const onFailure = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message || 'An error has occurred');
    setErrorOpen(true);
  };

  const onSubmit = async (data: Data) => {
    setLoading(true);
    try {
      await confirm(data);
      onSuccess();
    } catch (error: any) {
      onFailure(error);
    }
  };

  const onResendCode = async () => {
    setLoading(true);
    try {
      await resend();
      setLoading(false);
    } catch (error: any) {
      onFailure(error);
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
      <FixedLengthFieldContainer>
        <FixedLengthField
          error={!!errors.verification}
          errorMessage=""
          maxLength={6}
          numbersOnly
          {...register('verification', { required: true, pattern: /\d{6}/ })}
        />
      </FixedLengthFieldContainer>
      <StyledButton type="submit" loading={loading}>
        Verify
      </StyledButton>
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
    </StyledVerification>
  );
};

export default VerificationCode;
