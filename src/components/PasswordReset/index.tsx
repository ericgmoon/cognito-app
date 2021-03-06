import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert, Collapse, IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  confirmPasswordResetCode,
  sendPasswordResetCode,
} from '../../services/auth';
import VerificationCode from '../VerificationCode';

import {
  FormContainer, RootContainer, StyledButton, StyledTextField,
} from './index.styles';

interface Data {
  email: string;
  password: string,
}

interface NewPasswordFormProps {
  onComplete: (data: Data) => void;
}

const NewPasswordForm = ({ onComplete } : NewPasswordFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSuccess = (data: Data) => {
    setLoading(false);
    onComplete(data);
  };

  const onFailure = (err: any) => {
    setLoading(false);
    setErrorMessage(err.message || 'An error has occurred');
    setErrorOpen(true);
  };

  const onSubmit = async (data: Data) => {
    setLoading(true);
    try {
      await sendPasswordResetCode(data.email);
      onSuccess(data);
    } catch (err) {
      onFailure(err);
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
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="New Password"
        type="password"
        {...register('password', { required: true })}
        error={!!errors.password}
        errorMessage={errors.password ? getErrorMessage(errors.password.type, 'new password') : ''}
      />
      <StyledButton type="submit" loading={loading}>
        Reset Password
      </StyledButton>
    </FormContainer>
  );
};

interface PasswordResetCodeEntryProps {
  email: string,
  newPassword: string,
  onConfirm: () => void,
}

const PasswordResetCodeEntry = ({ email, newPassword, onConfirm }: PasswordResetCodeEntryProps) => (
  <VerificationCode
    confirm={async ({ verification }) =>
      confirmPasswordResetCode(email, verification, newPassword)}
    resend={async () => sendPasswordResetCode(email)}
    onConfirm={onConfirm}
  />
);

interface PasswordResetProps {
  onComplete: () => void;
}

const PasswordReset = ({ onComplete }: PasswordResetProps) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userData, setUserData] = useState<Data>({ email: '', password: '' });

  return (
    <RootContainer>
      {(isCodeSent ? (
        <PasswordResetCodeEntry
          email={userData.email}
          newPassword={userData.password}
          onConfirm={onComplete}
        />
      ) : (
        <NewPasswordForm onComplete={(data: Data) => {
          setIsCodeSent(true);
          setUserData(data);
        }}
        />
      ))}
    </RootContainer>
  );
};

export default PasswordReset;
