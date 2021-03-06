import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useForm } from 'react-hook-form';

import { signUp } from '../../services/auth';
import { useValidateNewUserMutation } from '../../services/users';
import FixedLengthField from '../FixedLengthField';
import TextField from '../TextField';

import {
  Container, PhoneNumberLabel, StyledButton, StyledSignUp,
} from './index.styles';

interface Data {
  email:string;
  password:string;
  phone:string;
}

interface SignUpProps {
  next: (email: string, password: string) => void;
}

const SignUp = ({ next } : SignUpProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validateNewUser] = useValidateNewUserMutation();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const onSuccess = (email: string, password: string) => {
    setLoading(false);
    next(email, password);
  };

  const onFailure = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message || 'An error has occurred');
    setErrorOpen(true);
  };

  const onSubmit = async (data: Data) => {
    setLoading(true);
    try {
      await validateNewUser(data.phone).unwrap();
      await signUp(data.email, data.password, data.phone);
      onSuccess(data.email, data.password);
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
    <StyledSignUp onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={4}
      >
        <Grid item xs={12}>
          <Container>
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
          </Container>
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="First Name"
            {...register('firstname', { required: true })}
            error={!!errors.firstname}
            errorMessage={errors.firstname ? getErrorMessage(errors.firstname.type, 'first name') : ''}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Last Name"
            {...register('lastname', { required: true })}
            error={!!errors.lastname}
            errorMessage={errors.lastname ? getErrorMessage(errors.lastname.type, 'last name') : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            error={!!errors.email}
            errorMessage={errors.email ? getErrorMessage(errors.email.type, 'email') : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Password"
            type="password"
            {...register('password', { required: true })}
            error={!!errors.password}
            errorMessage={errors.password ? getErrorMessage(errors.password.type, 'password') : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <PhoneNumberLabel>
            <Typography variant="subtitle1">Phone Number</Typography>
          </PhoneNumberLabel>
          <FixedLengthField
            error={!!errors.phone}
            errorMessage={errors.phone ? getErrorMessage(errors.phone.type, 'phone') : ''}
            displayedPrefix="04"
            prefix="+614"
            maxLength={8}
            numbersOnly
            size={isMd ? 'medium' : 'small'}
            {...register('phone', { required: true, pattern: /^\+614\d{8}/ })}
          />
        </Grid>
        <Grid item xs={12}>
          <Container>
            <StyledButton type="submit" loading={loading}>
              Sign Up
            </StyledButton>
          </Container>
        </Grid>
      </Grid>
    </StyledSignUp>
  );
};

export default SignUp;
