import { Typography } from '@mui/material';
import styled from 'styled-components';

import Button from '../Button';
import TextField from '../TextField';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  margin: ${({ theme }) => theme.spacing(2)};
  && {
    width: 320px
  };
`;

const StyledButton = styled(Button)`
  && {
    margin: ${({ theme }) => theme.spacing(2)};
  }
`;

const Title = styled(Typography)`
  && {
    color: ${({ theme }) => (theme.palette.secondary.dark)};
    font-weight: bold;
  }
`;

export { RootContainer, FormContainer, StyledButton, StyledTextField, Title };
