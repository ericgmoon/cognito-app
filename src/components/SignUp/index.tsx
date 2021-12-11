import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert, Collapse, Grid,
  IconButton,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

// import { signUpWithValidation } from '../../auth';
import FixedLengthField from '../FixedLengthField';

import {
  StyledButton, StyledSignUp, StyledTextField,
} from './index.styles';

interface Data {
  email:string;
  password:string;
}

const SignUp = (/* { mobile = false }: SignUpProps */) => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
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
    console.log(data.phone);
    // signUpWithValidation(data.email, data.password, onSuccess, onFailure);
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
          {/* errorMessage */ 'Hello'}
        </Alert>
      </Collapse>
      <Grid
        container
        spacing={4}
      >
        <Grid item xs={6}>
          <StyledTextField
            placeholder="First Name"
            {...register('firstname', { required: true })}
            error={!!errors.firstname}
            errorMessage={errors.firstname ? getErrorMessage(errors.firstname.type, 'first name') : ''}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            placeholder="Last Name"
            {...register('lastname', { required: true })}
            error={!!errors.lastname}
            errorMessage={errors.lastname ? getErrorMessage(errors.lastname.type, 'last name') : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            placeholder="Email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            error={!!errors.email}
            errorMessage={errors.email ? getErrorMessage(errors.email.type, 'email') : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            placeholder="Password"
            type="password"
            {...register('password', { required: true })}
            error={!!errors.password}
            errorMessage={errors.password ? getErrorMessage(errors.password.type, 'password') : ''}
          />
        </Grid>
        <Grid item xs={12}>

          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FixedLengthField
                {...field}
                error={!!errors.phone}
                errorMessage={errors.phone ? getErrorMessage(errors.phone.type, 'phone') : ''}
                displayedPrefix="04"
                prefix="+614"
                maxLength={8}
                numbersOnly
              />
            )}
          />
        </Grid>
      </Grid>
      <StyledButton type="submit" loading={loading}>
        Sign Up
      </StyledButton>
    </StyledSignUp>
  );
};

export default SignUp;
