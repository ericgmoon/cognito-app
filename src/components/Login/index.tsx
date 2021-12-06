import React from 'react';

import { useForm } from 'react-hook-form';

import Button from '../Button';
import TextField from '../TextField';

import { StyledLogin } from './index.styles';

// interface LoginProps {
//   mobile: boolean,
// }

interface Data {
  email:string;
  password:string;
}

const Login = (/* { mobile = false }: LoginProps */) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: Data) => console.log(data);
  console.log(errors);

  return (
    <StyledLogin onSubmit={handleSubmit(onSubmit)}>
      <TextField placeholder="Email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
      <TextField
        placeholder="Password"
        type="password"
        {...register('password', { required: true })}
      />
      <Button type="submit">
        Submit
      </Button>
    </StyledLogin>
  );
};

export default Login;
