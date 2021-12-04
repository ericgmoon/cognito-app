import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
// import styled from 'styled-components';

const StyledTextField = styled(TextField)<TextFieldProps>`
  background-color: ${(props) => (props.theme.palette.gray.main)};;
  border-radius: 32px;
  
  & label {
    padding-left: 8px;
    padding-right: 8px;
  }

  & label.Mui-focused {
    border-color: ${(props) => (props.theme.palette.primary.main)},
  }

  & .MuiOutlinedInput-root {
    padding-left: 8px;
    padding-right: 8px;
    & fieldset {
      border-color: ${(props) => (props.theme.palette.gray.main)};
      border-radius: 32px;
    }
    &:hover fieldset {
      border-color: ${(props) => (props.theme.palette.primary.main)};
    }
    &.Mui-focused fieldset {
      border-color: ${(props) => (props.theme.palette.primary.main)};
    }
  }
`;

export { StyledTextField };
