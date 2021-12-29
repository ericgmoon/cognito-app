import { Typography } from '@mui/material';
import styled from 'styled-components';

import Button from '../Button';
import FixedLengthField from '../FixedLengthField';

const StyledVerification = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledField = styled(FixedLengthField)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

const StyledButton = styled(Button)`
  && {
    margin: ${({ theme }) => theme.spacing(2)};
  }
`;

const FooterText = styled(Typography)`
  && {
    color: ${({ theme }) => (theme.palette.darkGray.main)};
    margin-top: ${({ theme }) => theme.spacing(6)};
  }
`;

export { StyledVerification, StyledButton, StyledField, FooterText };
