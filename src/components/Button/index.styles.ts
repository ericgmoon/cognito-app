import { LoadingButton as Button, LoadingButtonProps } from '@mui/lab';
import styled from 'styled-components';

interface StyledButtonProps extends LoadingButtonProps {
  disableCaps?: boolean,
}

const StyledButton = styled(Button)<StyledButtonProps>`
  && {
    text-transform: ${({ disableCaps }) => (disableCaps ? 'none' : undefined)};
    padding-left: ${({ theme }) => theme.spacing(8)};
    padding-right: ${({ theme }) => theme.spacing(8)};
    padding-top: ${({ theme }) => theme.spacing(2)};
    padding-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

export { StyledButton };
