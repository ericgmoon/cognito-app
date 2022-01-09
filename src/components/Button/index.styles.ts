import { LoadingButton as Button, LoadingButtonProps } from '@mui/lab';
import styled from 'styled-components';

interface StyledButtonProps extends LoadingButtonProps {
  disableCaps?: boolean,
}

const StyledButton = styled(Button)<StyledButtonProps>`
  && {
    text-transform: ${({ disableCaps }) => (disableCaps ? 'none' : undefined)};
    padding: ${({ theme }) => theme.spacing(2, 8)};
  }
`;

export { StyledButton };
