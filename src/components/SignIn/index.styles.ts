import styled from 'styled-components';

import Button from '../Button';
import TextField from '../TextField';

const StyledSignIn = styled.form`
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

export { StyledSignIn, StyledButton, StyledTextField };
