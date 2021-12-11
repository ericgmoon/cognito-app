import {
  Typography,
} from '@mui/material';
import styled from 'styled-components';

const RootContainer = styled.div`
  max-width: 1024px;
  margin: auto;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Typography)`
  && {
    color: ${({ theme }) => (theme.palette.secondary.dark)};
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    font-weight: bold;
  }
`;

const Logo = styled.img`
  width: 120px;
  margin: 24px;
  @media (max-width: 899px) {
    width: 96px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Bold = styled.b`
  color: ${({ theme }) => (theme.palette.darkGray.light)};
`;

export { Title, Logo, Container, Bold, RootContainer };
