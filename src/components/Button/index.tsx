import React from 'react';

import { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { useTheme } from 'styled-components';

import { StyledButton } from './index.styles';

interface ButtonProps extends Omit<MUIButtonProps, 'color'> {
  // Background color of the button
  color: string,
  // Color of the button text
  textColor: string,
}

const Button = ({ variant = 'contained', color, textColor, children, ...rest }: ButtonProps) => {
  const theme = useTheme();
  console.log(theme);

  return (
    <StyledButton
      variant={variant}
      cssColor={color}
      cssTextColor={textColor}
      disableRipple
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
