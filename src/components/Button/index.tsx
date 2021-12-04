import React from 'react';

import { ButtonProps as MUIButtonProps } from '@mui/material/Button';

import { StyledButton } from './index.styles';

interface ButtonProps extends MUIButtonProps {
  /**
   * If `true`, the button text is no longer transformed
   */
  disableCaps?: boolean,
}

const Button = ({ variant = 'contained', color = 'darkPrimary', children, ...rest }: ButtonProps) => (
  <StyledButton
    variant={variant}
    color={color}
    disableRipple
    {...rest}
  >
    {children}
  </StyledButton>
);

export default Button;
