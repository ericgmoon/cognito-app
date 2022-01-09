import {
  CardActions, CardContent, CardHeader,
} from '@mui/material';
import styled from 'styled-components';

import Button from '../Button';

const StyledButton = styled(Button)`
  && {
    background-color: white;
  }
`;

const StyledHeader = styled(CardHeader)`
  text-align: center;
  background-color: ${({ theme }) => (theme.palette.primary.dark)};
  color: white;
  & .MuiTypography-root {
    font-weight: 600;
  }
`;

const StyledContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (theme.palette.gray.main)};
`;

const StyledActions = styled(CardActions)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (theme.palette.gray.main)};
`;

export { StyledButton, StyledHeader, StyledContent, StyledActions };
