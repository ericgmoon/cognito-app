import React, { Fragment } from 'react';

import { Typography } from '@mui/material';

import { StyledButton } from './index.styles';

interface ButtonProps {
  color?: 'primary' | 'secondary';
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  text: string;
  onClick?: () => void;
}

const Button = ({ disabled = false, color = 'primary', size = 'small', variant = 'contained', text, onClick }: ButtonProps) => (
  <>
    <Typography variant="h1">Hello</Typography>
    <Typography>
      Hello HelloHelloHelloHelloHello
    </Typography>
    <StyledButton disabled={disabled} color={color} size={size} variant={variant} onClick={onClick}>
      {text}
    </StyledButton>
  </>
);

export default Button;
