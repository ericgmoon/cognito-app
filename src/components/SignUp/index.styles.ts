import styled from 'styled-components';

import Button from '../Button';

const StyledSignUp = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PhoneNumberLabel = styled.div`
  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.palette.darkGray.main};
`;

const StyledButton = styled(Button)`
  && {
    margin: ${({ theme }) => theme.spacing(2)};
  }
`;

export { StyledSignUp, Container, PhoneNumberLabel, StyledButton };
