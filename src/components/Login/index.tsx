import React from 'react';

import { useForm } from 'react-hook-form';

import TextField from '../TextField';

import {
  StyledButton, StyledLogin, TextFieldContainer,
} from './index.styles';

interface Data {
  email:string;
  password:string;
}

const Login = (/* { mobile = false }: LoginProps */) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: Data) => console.log(data);
  console.log(errors);

  const getErrorMessage = (type: string, field: string): string => {
    let error;

    if (type === 'pattern') {
      error = `Please enter a valid ${field}`;
    } else if (type === 'required') {
      error = `Please enter your ${field}`;
    } else {
      error = `Error: ${type}`;
    }

    return error;
  };

  return (
    <StyledLogin onSubmit={handleSubmit(onSubmit)}>
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
        Submit
      </StyledButton>
    </StyledLogin>
  );
};

export default Login;
