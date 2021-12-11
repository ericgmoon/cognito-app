import styled from 'styled-components';

import Button from '../Button';
import TextField from '../TextField';

const StyledSignUp = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

const StyledButton = styled(Button)`
  && {
    margin: ${({ theme }) => theme.spacing(2)};
  }
`;

export { StyledSignUp, StyledButton, StyledTextField };
