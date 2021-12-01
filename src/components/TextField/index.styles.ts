import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
// import styled from 'styled-components';

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  backgroundColor: theme.palette.gray.main,
  borderRadius: '32px',
  '& label': {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  '& label.Mui-focused': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    paddingLeft: '8px',
    paddingRight: '8px',
    '& fieldset': {
      borderColor: theme.palette.gray.main,
      borderRadius: '32px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export { StyledTextField };
