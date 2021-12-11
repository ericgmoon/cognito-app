import {
  InputBase, InputBaseProps, Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import styled from 'styled-components';

interface TextFieldProps extends InputBaseProps {
  errorMessage?: string
}

const StyledTextField = styled(InputBase)<TextFieldProps>`
  && .MuiInputBase-input {
    background-color: ${({ theme }) => (theme.palette.gray.main)};
    border-radius: 32px;
    width: 320px;
    padding: 8px 16px;
    border: 1px solid;
    border-color: ${({ error, theme }) => (error ? theme.palette.error.main : 'transparent')};
    box-shadow: ${({ error, theme }) => (error ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.1rem` : 'none')};
    transition: ${({ theme }) => theme.transitions.create([
    'border-color',
    'box-shadow',
  ])};

    &:focus {
      box-shadow: ${({ error, theme }) => (error ? alpha(theme.palette.error.main, 0.25) :
    alpha(theme.palette.primary.main, 0.25))} 0 0 0 0.1rem;
      border-color: ${({ error, theme }) => (error ? theme.palette.error.main :
    theme.palette.primary.main)};
    }
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorText = styled(Typography)`
  && {
    color: ${({ theme }) => (theme.palette.error.main)};
    margin-top: 0;
    height: 0;
    overflow: visible;
  }
`;

export { StyledTextField, Container, ErrorText };
