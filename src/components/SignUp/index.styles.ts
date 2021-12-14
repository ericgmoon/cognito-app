import styled from 'styled-components';

import TextField from '../TextField';

const StyledSignUp = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  //margin: ${({ theme }) => theme.spacing(2)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { StyledSignUp, StyledTextField, Container };
