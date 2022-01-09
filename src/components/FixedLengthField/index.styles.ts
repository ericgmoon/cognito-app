import {
  InputBase, InputBaseProps, Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import styled from 'styled-components';

const StyledTextField = styled(InputBase)<InputBaseProps>`
  && .MuiInputBase-input {
    background-color: ${({ theme }) => theme.palette.gray.light};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    width: ${({ size }) => (size === 'small' ? '8px' : '12px')};
    font-size: ${({ size }) => (size === 'small' ? '0.75rem' : '1rem')};
    padding:  ${({ theme }) => theme.spacing(1)};
    border: ${({ size }) => (size === 'small' ? '1px' : '2px')} solid;
    border-color: ${({ error, theme }) => (error ? theme.palette.error.main : theme.palette.gray.dark)};
    box-shadow: ${({ error, theme }) => (error ? `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.1rem` : 'none')};
    text-align: center;
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

interface FieldContainerProps {
  size?: 'small' | 'medium';
}

const FieldContainer = styled.div<FieldContainerProps>`
  display: flex;
  flex-direction: row;
  gap: ${({ theme, size }) => (size === 'small' ? theme.spacing(0.5) : theme.spacing(1))};
`;

const ProxyInputField = styled.input`
  height: 0;
  opacity: 0;
  filter:alpha(opacity=0);
`;

export { StyledTextField, Container, ErrorText, FieldContainer, ProxyInputField };
