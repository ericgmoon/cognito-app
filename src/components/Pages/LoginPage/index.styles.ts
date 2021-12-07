import {
  Typography,
} from '@mui/material';
import styled from 'styled-components';

const RootContainer = styled.div`
  max-width:1024px;
  margin: auto;
`;

const Title = styled(Typography)`
  && {
    color: ${({ theme }) => (theme.palette.secondary.dark)};
    margin: 24px;
    font-weight: bold;
  }
`;

const Logo = styled.img`
  width: 120px;
  margin: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Bold = styled.b`
  color: ${({ theme }) => (theme.palette.darkGray.light)};
`;

export { Title, Logo, Container, Bold, RootContainer };
