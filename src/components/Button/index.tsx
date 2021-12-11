import React from 'react';

import { LoadingButtonProps } from '@mui/lab';

import { StyledButton } from './index.styles';

interface ButtonProps extends LoadingButtonProps {
  /**
   * If `true`, the button text is no longer transformed
   */
  disableCaps?: boolean,
}

const Button = ({ variant = 'contained', color = 'darkPrimary', children, ...rest }: ButtonProps) => (
  <StyledButton
    variant={variant}
    loadingPosition="end"
    color={color}
    disableRipple
    {...rest}
  >
    {children}
  </StyledButton>
);

export default Button;
