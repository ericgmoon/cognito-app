import React from 'react';

import { useForm } from 'react-hook-form';

import TextField from '../TextField';

import {
  StyledButton, StyledSignIn, TextFieldContainer,
} from './index.styles';

interface Data {
  email:string;
  password:string;
}

const SignIn = (/* { mobile = false }: SignInProps */) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: Data) => console.log(data);

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
      <TextFieldContainer>
        <TextField
          placeholder="Email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          error={!!errors.email}
          errorMessage={errors.email ? getErrorMessage(errors.email.type, 'email') : ''}
        />
      </TextFieldContainer>
      <TextFieldContainer>
        <TextField
          placeholder="Password"
          type="password"
          {...register('password', { required: true })}
          error={!!errors.password}
          errorMessage={errors.password ? getErrorMessage(errors.password.type, 'password') : ''}
        />
      </TextFieldContainer>
      <StyledButton type="submit">
        Sign In
      </StyledButton>
    </StyledSignIn>
  );
};

export default SignIn;
