import styled from 'styled-components';

import Button from '../Button';

const StyledSignIn = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextFieldContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(2)};
`;

const StyledButton = styled(Button)`
  && {
    margin: ${({ theme }) => theme.spacing(2)};
  }
`;

export { StyledSignIn, TextFieldContainer, StyledButton };
