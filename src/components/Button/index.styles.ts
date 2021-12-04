import { Button } from '@mui/material';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import styled from 'styled-components';

interface StyledButtonProps extends MUIButtonProps {
  disableCaps?: boolean,
}

const StyledButton = styled(Button)<StyledButtonProps>`
  && {
    text-transform: ${({ disableCaps }) => (disableCaps ? 'none' : undefined)};
    padding-left: 48px;
    padding-right: 48px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 8px
  }
`;

export { StyledButton };
