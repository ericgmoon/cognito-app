import { Typography } from '@mui/material';
import styled from 'styled-components';

import Button from '../Button';

const StyledVerification = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  && {
    margin: ${({ theme }) => theme.spacing(2)};
  }
`;

const FooterText = styled(Typography)`
  && {
    color: ${({ theme }) => (theme.palette.darkGray.main)};
  }
`;

const FixedLengthFieldContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export { StyledVerification, StyledButton, FooterText, FixedLengthFieldContainer };
