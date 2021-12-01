import React from 'react';

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
  <StyledButton disabled={disabled} color={color} size={size} variant={variant} onClick={onClick}>
    {text}
  </StyledButton>
);

export default Button;
