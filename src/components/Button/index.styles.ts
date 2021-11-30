import { Button } from '@mui/material';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import styled from 'styled-components';

interface StyledButtonProps extends Omit<MUIButtonProps, 'color'> {
  cssColor?: string,
  cssTextColor?: string,
}

const StyledButton = styled(Button)<StyledButtonProps>`
  && {
    background-color: ${({ theme, cssColor }) => cssColor || theme.palette.darkPrimary.main};
    color: ${({ theme, cssTextColor }) => cssTextColor || theme.palette.common.white}
  }
`;

export { StyledButton };
