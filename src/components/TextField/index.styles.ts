import { InputBase, InputBaseProps } from '@mui/material';
import { alpha } from '@mui/material/styles';
import styled from 'styled-components';

const StyledTextField = styled(InputBase)<InputBaseProps>`
  & .MuiInputBase-input {
    margin: 8px;
    background-color: ${({ theme }) => (theme.palette.gray.main)};;
    border-radius: 32px;
    width: 360px;
    padding: 8px 16px;
    border: 1px solid transparent;
    transition: ${({ theme }) => theme.transitions.create([
    'border-color',
    'box-shadow',
  ])};

    &:focus {
      box-shadow: ${({ theme }) => alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.1rem;
      border-color: ${({ theme }) => (theme.palette.primary.main)};
    }
  }
`;

export { StyledTextField };
